import { TweetV2PaginableTimelineResult, UserV2 } from 'twitter-api-v2'

import type { Tweet } from '@fc/types'

export const mapTweetResponseToTweet = (
  data: TweetV2PaginableTimelineResult,
  userData?: UserV2,
): Tweet[] => {
  if (!data?.data) return []

  const { data: tweets, includes } = data

  return tweets?.map(tweet => {
    const tweetUser = includes?.users?.find(user => user.id === tweet.author_id)

    const { id, text, created_at, attachments, public_metrics } = tweet
    const media = includes?.media?.find(
      media => media.media_key === attachments?.media_keys?.[0],
    )

    const video = media?.variants
      ?.filter(variant => variant.bit_rate)
      .sort((a, b) => (a.bit_rate || 0) - (b.bit_rate || 0))?.[0]?.url

    const image = media?.preview_image_url || media?.url
    const user = userData
      ? {
          id: userData?.id,
          name: userData?.name,
          username: userData?.username,
          profile: userData?.profile_image_url,
        }
      : tweetUser
        ? {
            id: tweetUser.id,
            name: tweetUser.name,
            username: tweetUser.username,
            profile: tweetUser.profile_image_url,
          }
        : null
    const likes = public_metrics.like_count
    const retweets = public_metrics.retweet_count
    const replies = public_metrics.reply_count
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const impressions = (public_metrics as any).impression_count

    return {
      id,
      text,
      createdAt: created_at,
      video,
      image,
      user,
      likes,
      retweets,
      replies,
      impressions,
    }
  })
}
