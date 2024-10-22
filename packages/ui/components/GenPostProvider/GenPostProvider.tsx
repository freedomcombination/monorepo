import { PropsWithChildren, useRef, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { Stack, Text } from '@chakra-ui/react'
import { useLocalStorage } from 'usehooks-ts'

import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  Button,
} from '@fc/chakra'
import type { ArchiveContent, Hashtag, Post } from '@fc/types'

import { GenPostContext } from './GenPostContext'
import { ArchiveContentPosts, ArchivePostType } from './types'

type GenPostProviderProps = PropsWithChildren<{
  hashtag: Hashtag
  archives: ArchiveContent[]
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
  archives,
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
  const { open, onOpen, onClose } = useDisclosure()
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

  const addPosts = (archiveId: number, posts: ArchivePostType[]) => {
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

  const modifyPost = (archiveId: number, updatedPost: ArchivePostType) => {
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
    updatedPost: ArchivePostType,
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
              } as ArchivePostType
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

  const getArchive = (archiveId: number) => {
    return archives?.find(archive => archive.id === archiveId)
  }

  return (
    <GenPostContext.Provider
      value={{
        addPosts,
        removePosts,
        modifyPost,
        removePost,
        getArchive,
        archives,
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
        <Dialog
          motionPreset="slide-in-bottom"
          onOpenChange={e => (e.open ? null : onClose())}
          open={open}
          placement={'center'}
        >
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>Discard Changes?</DialogHeader>
            <DialogCloseButton />
            <DialogBody>
              <Stack gap={8}>
                <Text>{alertAction?.title}</Text>
                {alertAction?.extra && (
                  <Text fontSize="sm" borderLeft={'1px'} pl={2}>
                    {alertAction?.extra}
                  </Text>
                )}
              </Stack>
            </DialogBody>
            <DialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                colorPalette="red"
                ml={3}
                onClick={() => {
                  alertAction?.action()
                  onClose()
                }}
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {children}
      </>
    </GenPostContext.Provider>
  )
}
