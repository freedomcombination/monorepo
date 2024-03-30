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
  Text,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Stack,
} from '@chakra-ui/react'
import { useLocalStorage } from 'usehooks-ts'

import { OgImageParams, PostCreateInput, UploadFile } from '@fc/types'
import { generateOgImageParams } from '@fc/utils'

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

export const convertToArchivePost = (
  posts: GeneratedArchiveContentPost[],
  hashtagId: number,
  image?: UploadFile | null,
) => {
  let uniqId = Date.now()
  const ret: ArchivePost[] = []
  const postInput =
    hashtagId > 0
      ? ({
          imageParams: generateOgImageParams({
            image,
          } as OgImageParams),
          hashtag: hashtagId,
        } as PostCreateInput)
      : ({} as PostCreateInput)

  for (const post of posts) {
    ret.push({
      ...post,
      id: uniqId++,
      postInput,
    })
  }

  return ret
}

type ArchiveContentPosts = Record<number, Record<number, ArchivePost[]>>

type GenPostValueType = {
  addPosts: (
    archiveId: number,
    posts: GeneratedArchiveContentPost[],
  ) => ArchivePost[]
  removePosts: (archiveId: number, dontAsk?: boolean) => void
  removePost: (archiveId: number, postId: number) => void
  modifyPost: (archiveId: number, updatedPost: ArchivePost) => void
  postCount: (archiveId: number) => number
  getPosts: (archiveId: number) => ArchivePost[]
  hashtagId: number
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
  hashtagId: 0,
  askBeforeDelete: true,
  setAskBeforeDelete: () => null,
  getPosts: () => [],
  removeSentence: () => null,
})

export const useGenPostContext = () => {
  return useContext(GenPostContext)
}

type GenPostProviderProps = PropsWithChildren<{
  image?: UploadFile | null
  hashtagId: number
  postId?: number
}>

type DialogAction = {
  action: () => void
  title: string
  extra?: string
}

export const GenPostProvider = ({
  children,
  image,
  hashtagId,
  postId,
}: GenPostProviderProps) => {
  const [askBeforeDelete, setAskBeforeDelete] = useLocalStorage(
    'ask-before-delete',
    true,
  )
  const [posts, setPosts] = useLocalStorage<ArchiveContentPosts>(
    postId
      ? `generated-archive-content-posts-sentences`
      : 'generated-archive-content-posts',
    [],
  )
  const [alertAction, setAlertAction] = useState<DialogAction>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  const regId = postId ? postId : hashtagId

  const showAlert = (title: string, action: () => void, extra?: string) => {
    setAlertAction({
      title,
      action,
      extra,
    })
    onOpen()
  }

  const addPosts = (
    archiveId: number,
    posts: GeneratedArchiveContentPost[],
  ) => {
    const preparedPosts = convertToArchivePost(
      posts,
      postId ? -1 : hashtagId,
      image,
    )

    setPosts(prevPosts => {
      const newPosts = { ...prevPosts }
      if (!newPosts[archiveId]) {
        newPosts[archiveId] = {}
      }
      if (!newPosts[archiveId][regId]) {
        newPosts[archiveId][regId] = []
      }
      newPosts[archiveId][regId] = [
        ...preparedPosts,
        ...newPosts[archiveId][regId],
      ]

      return newPosts
    })

    return preparedPosts
  }

  const modifyPost = (archiveId: number, updatedPost: ArchivePost) => {
    setPosts(prevPosts => {
      const newPosts = { ...prevPosts }
      if (newPosts[archiveId] && newPosts[archiveId][regId]) {
        const updatedPosts = newPosts[archiveId][regId].map(post => {
          if (post.id === updatedPost.id) {
            return {
              ...updatedPost,
              sentences: updatedPost.sentences.filter(
                sentence => sentence.trim() !== '',
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

  const postCount = (archiveId: number) => getPosts(archiveId).length

  return (
    <GenPostContext.Provider
      value={{
        addPosts,
        removePosts,
        modifyPost,
        removePost,
        hashtagId,
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
