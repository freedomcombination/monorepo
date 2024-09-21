import { FC, useMemo } from 'react'

import { Divider, Stack } from '@chakra-ui/react'

import { useHashtag } from '@fc/services/hashtag'

import { PostMakerTweetCard } from './PostMakerTweetCard'
import { PostMakerTweetListProps } from './types'
import { useHashtagContext } from '../HashtagProvider'
import { PostProvider } from '../PostProvider'

export const PostMakerTweetList: FC<PostMakerTweetListProps> = ({
  isIosSafari,
}) => {
  const { postSentenceShares } = useHashtagContext()
  const hashtag = useHashtag()

  const sortedPosts = useMemo(() => {
    return hashtag.posts.sort((a, b) => {
      const leastShareCountA = postSentenceShares[a.id]?.leastShareCount || 0
      const leastShareCountB = postSentenceShares[b.id]?.leastShareCount || 0

      if (leastShareCountA === 0 && leastShareCountB !== 0) {
        return -1
      } else if (leastShareCountA !== 0 && leastShareCountB === 0) {
        return 1
      } else {
        const difference = leastShareCountA - leastShareCountB
        // If posts have the same share count
        // we want to randomly sort them
        if (difference === 0) {
          return Math.random() < 0.5 ? -1 : 1
        }

        return difference
      }
    })
  }, [postSentenceShares, hashtag?.posts])

  return (
    <Stack>
      <Stack borderWidth={1} spacing={0} divider={<Divider />}>
        {sortedPosts.map(post => {
          return (
            <PostProvider key={post.id} post={post}>
              {post && <PostMakerTweetCard isIosSafari={isIosSafari} />}
            </PostProvider>
          )
        })}
      </Stack>
    </Stack>
  )
}
