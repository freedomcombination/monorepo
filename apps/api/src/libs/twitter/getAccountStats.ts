import { addDays, formatISO } from 'date-fns'

import { getTwitterClient } from './client'

export const getAccountStats = async (
  username: string,
  date = new Date(),
  totalDays = 7,
) => {
  try {
    const twitterClient = await getTwitterClient()
    const user = await twitterClient.v2.userByUsername(username, {
      'user.fields': 'public_metrics',
      'tweet.fields': 'public_metrics',
    })

    const followers = user.data.public_metrics.followers_count
    const followings = user.data.public_metrics.following_count
    let tweets = 0
    let likes = 0
    let retweets = 0
    let replies = 0

    const start_time = formatISO(addDays(date, -totalDays))
    const end_time = formatISO(date)

    const timeline = await twitterClient.v2.userTimeline(user.data.id, {
      start_time,
      end_time,
      exclude: ['retweets', 'replies'],
      'tweet.fields': 'public_metrics',
    })

    timeline.data?.data?.forEach(item => {
      likes += item.public_metrics.like_count
      retweets += item.public_metrics.retweet_count
      replies += item.public_metrics.reply_count
      tweets += 1
    })

    return {
      followers,
      followings,
      tweets,
      retweets,
      likes,
      replies,
      username,
    }
  } catch (error) {
    console.error('Error getting account statistics', error)

    return null
  }
}
