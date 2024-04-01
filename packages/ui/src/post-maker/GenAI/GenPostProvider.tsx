import {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useLocalStorage } from 'usehooks-ts'

import { Hashtag, Post, PostCreateInput } from '@fc/types'

export type GeneratedSentences = {
  sentences: string[]
}

export type GeneratedArchiveContentPost = {
  description: string
} & GeneratedSentences

export type ArchivePost = {
  id: number
  postInput: PostCreateInput
} & GeneratedArchiveContentPost

type ArchiveContentPosts = Record<number, Record<number, ArchivePost[]>>

type GenPostValueType = {
  addPosts: (archiveId: number, posts: ArchivePost[]) => ArchivePost[]
  removePosts: (archiveId: number, dontAsk?: boolean) => void
  removePost: (archiveId: number, postId: number) => void
  modifyPost: (archiveId: number, updatedPost: ArchivePost) => void
  postCount: (archiveId: number) => number
  getPosts: (archiveId: number) => ArchivePost[]
  hashtag: Hashtag
  post?: Post
  askBeforeDelete: boolean
  setAskBeforeDelete: (askBeforeDelete: boolean) => void
  removeSentence: (
    archiveId: number,
    updatedPost: ArchivePost,
    content: string,
  ) => void
}

const GenPostContext = createContext<GenPostValueType>({
  addPosts: () => [],
  removePosts: () => Promise.resolve(),
  removePost: () => null,
  modifyPost: () => null,
  postCount: () => 0,
  hashtag: {} as Hashtag,
  post: undefined,
  askBeforeDelete: true,
  setAskBeforeDelete: () => null,
  getPosts: () => [],
  removeSentence: () => null,
})

export const useGenPostContext = () => {
  return useContext(GenPostContext)
}

type GenPostProviderProps = PropsWithChildren<{
  hashtag: Hashtag
  post?: Post
}>

type DialogAction = {
  action: () => void
  title: string
  extra?: string
}

export const GenPostProvider = ({
  children,
  hashtag,
  post,
}: GenPostProviderProps) => {
  const [askBeforeDelete, setAskBeforeDelete] = useLocalStorage(
    'ask-before-delete',
    true,
  )
  const [posts, setPosts] = useLocalStorage<ArchiveContentPosts>(
    post
      ? `generated-archive-content-posts-sentences`
      : 'generated-archive-content-posts',
    [],
  )
  const [alertAction, setAlertAction] = useState<DialogAction>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  const regId = post?.id ?? hashtag.id

  const showAlert = (title: string, action: () => void, extra?: string) => {
    setAlertAction({
      title,
      action,
      extra,
    })
    onOpen()
  }

  const addPosts = (archiveId: number, posts: ArchivePost[]) => {
    setPosts(prevPosts => {
      const newPosts = { ...prevPosts }
      if (!newPosts[archiveId]) {
        newPosts[archiveId] = {}
      }
      if (!newPosts[archiveId][regId]) {
        newPosts[archiveId][regId] = []
      }
      newPosts[archiveId][regId] = [...posts, ...newPosts[archiveId][regId]]

      return newPosts
    })

    return posts
  }

  const modifyPost = (archiveId: number, updatedPost: ArchivePost) => {
    setPosts(prevPosts => {
      const newPosts = { ...prevPosts }

      if (!newPosts[archiveId]?.[regId]) {
        return newPosts
      }

      const updatedPosts = newPosts[archiveId][regId].map(post => {
        if (post.id !== updatedPost.id) {
          return post
        }

        return {
          ...updatedPost,
          sentences: updatedPost.sentences.filter(
            sentence => sentence.trim() !== '',
          ),
        }
      })

      newPosts[archiveId][regId] = updatedPosts

      return newPosts
    })
  }

  const removeSentences = (
    archiveId: number,
    updatedPost: ArchivePost,
    content: string,
  ) => {
    const removeAction = () => {
      setPosts(prevPosts => {
        const newPosts = { ...prevPosts }
        if (newPosts[archiveId] && newPosts[archiveId][regId]) {
          const updatedPosts = newPosts[archiveId][regId].map(post => {
            if (post.id === updatedPost.id) {
              return {
                ...updatedPost,
                sentences: updatedPost.sentences.filter(
                  sentence => sentence !== content,
                ),
              } as ArchivePost
            }

            return post
          })
          newPosts[archiveId][regId] = updatedPosts
        }

        return newPosts
      })
    }

    if (askBeforeDelete) {
      showAlert(
        'Are you sure you want to delete sentence?',
        removeAction,
        content,
      )

      return
    }

    removeAction()
  }

  const removePosts = (archiveId: number, dontAsk?: boolean) => {
    const removeAction = () => {
      setPosts(prevPosts => {
        const newPosts = { ...prevPosts }
        if (newPosts[archiveId] && newPosts[archiveId][regId]) {
          delete newPosts[archiveId][regId]
        }

        return newPosts
      })
    }

    if (askBeforeDelete && !dontAsk) {
      showAlert('Are you sure you want to delete all posts?', removeAction)

      return
    }

    removeAction()
  }

  const removePost = (archiveId: number, idToDelete: number) => {
    const removeAction = () => {
      setPosts(prevPosts => {
        const newPosts = { ...prevPosts }
        if (newPosts[archiveId] && newPosts[archiveId][regId]) {
          newPosts[archiveId][regId] = newPosts[archiveId][regId].filter(
            post => post.id !== idToDelete,
          )
        }

        return newPosts
      })
    }

    if (askBeforeDelete) {
      showAlert(
        'Are you sure you want to delete this post with all sentences?',
        removeAction,
        posts[archiveId][regId].find(post => post.id === idToDelete)
          ?.description ?? '',
      )

      return
    }

    removeAction()
  }

  const getPosts = (archiveId: number) => {
    if (!posts || !posts[archiveId] || !posts[archiveId][regId]) {
      return []
    }

    return posts[archiveId][regId]
  }

  const postCount = (archiveId: number) =>
    posts?.[archiveId]?.[regId]?.length ?? 0

  return (
    <GenPostContext.Provider
      value={{
        addPosts,
        removePosts,
        modifyPost,
        removePost,
        hashtag,
        post,
        askBeforeDelete,
        setAskBeforeDelete,
        removeSentence: removeSentences,
        postCount,
        getPosts,
      }}
    >
      <>
        <AlertDialog
          motionPreset="slideInBottom"
          onClose={onClose}
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Stack spacing={8}>
                <Text>{alertAction?.title}</Text>
                {alertAction?.extra && (
                  <Text fontSize="sm" borderLeft={'1px'} pl={2}>
                    {alertAction?.extra}
                  </Text>
                )}
              </Stack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  alertAction?.action()
                  onClose()
                }}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {children}
      </>
    </GenPostContext.Provider>
  )
}
