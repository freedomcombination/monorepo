import { FC, useMemo } from 'react'

import { Divider, Stack } from '@chakra-ui/react'

import { useAuthContext } from '@fc/context'
import { useHashtag } from '@fc/services'

import { PostMakerTweetCard } from './PostMakerTweetCard'
import { PostMakerTweetListProps } from './types'
import { useHashtagContext } from '../HashtagProvider'
import { PostProvider } from '../PostProvider'

export const PostMakerTweetList: FC<PostMakerTweetListProps> = ({
  isIosSafari,
}) => {
  const { postSentenceShares } = useHashtagContext()
  const hashtag = useHashtag()
  const { canUpdate } = useAuthContext()

  const canManageSentences = canUpdate('posts')

  const sortedPosts = useMemo(() => {
    if (!hashtag?.posts) return []

    return hashtag.posts.sort((a, b) => {
      const difference =
        (postSentenceShares[a.id]?.leastShareCount || 0) -
        (postSentenceShares[b.id]?.leastShareCount || 0)

      // If posts have the same share count
      // we want to randomly sort them
      if (difference === 0) {
        return Math.random() < 0.5 ? -1 : 1
      }

      return difference
    })
  }, [postSentenceShares, hashtag?.posts])

  return (
    <Stack>
      <Stack borderWidth={1} spacing={0} divider={<Divider />}>
        {sortedPosts.map(post => {
          return (
            <PostProvider key={post.id} post={post}>
              {post && (
                <PostMakerTweetCard
                  isIosSafari={isIosSafari}
                  canManageSentences={canManageSentences}
                />
              )}
            </PostProvider>
          )
        })}
      </Stack>
    </Stack>
  )
}
