import { UserV2 } from 'twitter-api-v2'

import { Tweet } from '@fc/types'

import { getTwitterClient } from './client'
import { mapTweetResponseToTweet } from '../../utils'

export const getUserTweets = async (
  userId: string,
  userData?: UserV2,
): Promise<Tweet[]> => {
  let user: UserV2 = userData

  try {
    const twitterClient = await getTwitterClient()

    if (!user) {
      const result = await twitterClient.v2.user(userId, {
        'user.fields': ['profile_image_url', 'username'],
      })
      user = result?.data
    }

    const tweetsResponse = await twitterClient.v2.userTimeline(userId, {
      exclude: ['retweets', 'replies'],
      max_results: 20,
      'media.fields': ['url', 'preview_image_url', 'variants'],
      'tweet.fields': ['attachments', 'public_metrics'],
      expansions: ['attachments.media_keys'],
    })

    if (!tweetsResponse?.data) return []

    const tweets: Tweet[] = mapTweetResponseToTweet(tweetsResponse.data, user)

    return tweets
  } catch (error) {
    console.error('Error getting user tweets', error)
    strapi.plugin('sentry').service('sentry').sendError(error)
    return []
  }
}
