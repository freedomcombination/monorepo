import { Stack, Tag, TagCloseButton, TagLabel, Wrap } from '@chakra-ui/react'

import { useHashtag } from '@wsvvrijheid/services'

import { useHashtagContext } from '../HashtagProvider'
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
      <Wrap>
        {mentionUsernames.map(mention => (
          <Tag
            key={mention}
            colorScheme={'primary'}
            variant={'outline'}
            rounded={'full'}
            px={2}
          >
            <TagLabel>@{mention}</TagLabel>

            <TagCloseButton
              onClick={() => removeMentionFromPost(post.id, mention)}
            />
          </Tag>
        ))}
      </Wrap>
      <Wrap>
        {defaultTrendNames.map(trend => (
          <Tag
            key={trend}
            variant={'outline'}
            rounded={'full'}
            px={2}
            colorScheme={hashtag.hasPassed ? 'gray' : 'twitter'}
          >
            <TagLabel>{trend}</TagLabel>
            {hashtag.hasPassed && (
              <TagCloseButton
                onClick={() => removeDefaultTrendFromPost(post.id, trend)}
              />
            )}
          </Tag>
        ))}
        {trendNames.map(trend => (
          <Tag key={trend} variant={'outline'} rounded={'full'} px={2}>
            <TagLabel>{trend}</TagLabel>
            <TagCloseButton
              onClick={() => removeTrendFromPost(post.id, trend)}
            />
          </Tag>
        ))}
      </Wrap>
    </Stack>
  )
}
