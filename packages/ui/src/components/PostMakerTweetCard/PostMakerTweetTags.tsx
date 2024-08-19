import { Stack, Group } from '@chakra-ui/react'

import { Tag } from '@fc/chakra'
import { useHashtag } from '@fc/services'

import { useHashtagContext } from '../../components/HashtagProvider'
import { usePostContext } from '../PostProvider'

export const PostMakerTweetTags = () => {
  const { post } = usePostContext()
  const {
    postMentions,
    postTrends,
    defaultTrends,
    removeDefaultTrendFromPost,
    removeMentionFromPost,
    removeTrendFromPost,
  } = useHashtagContext()
  const hashtag = useHashtag()

  if (!post) return null

  const mentionUsernames = postMentions[post.id] ?? []
  const trendNames = postTrends[post.id] ?? []
  const defaultTrendNames = defaultTrends[post.id] ?? []

  return (
    <Stack>
      <Group wrap={'wrap'}>
        {mentionUsernames.map(mention => (
          <Tag
            key={mention}
            colorScheme={'primary'}
            variant={'outline'}
            rounded={'full'}
            px={2}
            onClose={() => removeMentionFromPost(post.id, mention)}
            closable
          >
            @{mention}
          </Tag>
        ))}
      </Group>
      <Group wrap={'wrap'}>
        {defaultTrendNames.map(trend => (
          <Tag
            key={trend}
            variant={'outline'}
            rounded={'full'}
            px={2}
            colorScheme={hashtag.hasPassed ? 'gray' : 'twitter'}
            closable={hashtag.hasPassed}
            onClose={() => removeDefaultTrendFromPost(post.id, trend)}
          >
            {trend}
          </Tag>
        ))}
        {trendNames.map(trend => (
          <Tag
            key={trend}
            variant={'outline'}
            rounded={'full'}
            px={2}
            closable
            onClose={() => removeTrendFromPost(post.id, trend)}
          >
            {trend}
          </Tag>
        ))}
      </Group>
    </Stack>
  )
}
