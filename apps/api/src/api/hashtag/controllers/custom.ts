import { addHours } from 'date-fns'
import { Context } from 'koa'
import { ETwitterStreamEvent, TweetV2SingleResult } from 'twitter-api-v2'

import { getTwitterClient, hashtagStatsStore } from '../../../libs'
import { getReferenceModel, mapTweetResponseToTweet } from '../../../utils'

let isStarted = false

export default {
  async search(ctx: Context) {
    const twitterClient = await getTwitterClient()

    try {
      const result = await twitterClient.v2.search({
        query: ctx.query.q as string,
        max_results: 50,
        expansions: ['attachments.media_keys', 'author_id'],
        'media.fields': ['url', 'preview_image_url', 'variants'],
        'tweet.fields': ['attachments', 'public_metrics'],
        'user.fields': ['name', 'username', 'profile_image_url'],
      })

      const tweets = mapTweetResponseToTweet(result?.data)

      ctx.send(tweets)
    } catch (error) {
      console.error('Error searching hashtags', error)
      strapi.plugin('sentry').service('sentry').sendError(error)
      ctx.send([])
    }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentHashtag = await strapi.entityService.findOne(
      'api::hashtag.hashtag',
      id,
      {
        populate: ['localizations.image'],
      },
    )

    const referenceHashtag = getReferenceModel(currentHashtag)

    const result = await strapi.entityService.update(
      'api::hashtag.hashtag',
      id,
      {
        data: { image: referenceHashtag.image?.id },
      },
    )

    return { data: result }
  },
  async hashtagEventStats(ctx: Context) {
    const duration = parseFloat(ctx.query.duration as string)

    // check if stream is started
    if (isStarted) {
      return { message: 'Stream is already started' }
    }

    // check if duration is provided
    if (!duration) {
      return { message: 'Duration is required' }
    }

    // check if duration is a number
    if (Number.isNaN(duration)) {
      return { message: 'Duration is not a number' }
    }

    try {
      const sixHoursAgo = addHours(new Date(), -6).toISOString()
      const twitterClient = await getTwitterClient()

      // get hashtags
      const data = await strapi.entityService.findMany('api::hashtag.hashtag', {
        filters: {
          date: {
            $gte: sixHoursAgo,
          },
        },
      })

      // check if there is no hashtags
      if (!data || data.length === 0) return 'No hashtags in the last 6 hours'

      // convert hashtags to rule format
      const hashtagRules = data.map(hashtag => ({
        value: hashtag.hashtagDefault,
        tag: hashtag.hashtagDefault,
      }))

      // reset rules
      const rules = await twitterClient.v2.streamRules()

      if (rules.data?.length) {
        await twitterClient.v2.updateStreamRules({
          delete: { ids: rules.data.map(rule => rule.id) },
        })
      }

      // add your rules here
      await twitterClient.v2.updateStreamRules({
        add: hashtagRules,
      })

      // start stream
      const stream = await twitterClient.v2.getStream<TweetV2SingleResult>(
        'tweets/search/stream',
        {
          'tweet.fields': [
            'entities',
            'text',
            'public_metrics',
            'created_at',
            'referenced_tweets',
            'in_reply_to_user_id',
            'reply_settings',
          ],
          'user.fields': ['username', 'name', 'profile_image_url'],
          expansions: [
            'author_id',
            'referenced_tweets.id',
            'in_reply_to_user_id',
          ],
        },
      )

      // auto reconnect
      stream.autoReconnect = true

      // listen for tweets
      stream.on(ETwitterStreamEvent.Data, async tweet => {
        // reconnect on error
        if (tweet.errors) {
          stream.reconnect()
        }

        // convert tweet to grouped tweet
        const groupedTweet = {
          user: tweet.includes?.users[0]?.username,
          tweet: tweet.data.text,
          tweetId: tweet.data.id,
          isRetweeted: tweet.includes?.users[1],
          isRetweet: tweet.data.referenced_tweets?.some(
            tweet => tweet.type === 'retweeted',
          ),
          isReply: tweet.data.in_reply_to_user_id,
        }

        hashtagStatsStore.increment(groupedTweet.user, groupedTweet)
      })

      // to prevent starting the stream again
      isStarted = true

      // reconnect on error
      stream.on(ETwitterStreamEvent.Error, error => {
        console.error('HashtagEventStream', error)
        stream.reconnect()
      })

      // send stored tweets to db every 30 minutes
      const saveTweets = setInterval(
        async () => {
          const storedData = Object.values(hashtagStatsStore.store)
          const tweets = storedData.map(tweet => ({
            username: tweet.username,
            total: tweet.total,
            retweet: tweet.retweet,
            tweets: tweet.tweet,
            replies: tweet.replies,
            getReplies: tweet.getReplies,
            getRetweeted: tweet.getRetweeted,
          }))

          // update tweets
          await strapi.entityService.update(
            'api::hashtag.hashtag',
            data[0].id,
            {
              data: {
                tweets,
              },
            },
          )
        },
        30 * 60 * 1000,
      )

      // close the stream after the duration(hours)
      setTimeout(
        () => {
          stream.destroy()
          isStarted = false
          hashtagStatsStore.reset()
          clearInterval(saveTweets)
        },
        duration * 60 * 60 * 1000,
      )

      return { message: 'Stream is open' }
    } catch (error) {
      strapi.plugin('sentry').service('sentry').sendError(error)
      if (
        error.code === 429 &&
        error.data?.connection_issue === 'TooManyConnections'
      ) {
        return { message: 'Connection is already open', error: error.message }
      }

      return { message: 'Something went wrong.', error: error.message }
    }
  },
  async getHashtagStats() {
    const lengthOfUsers = Object.keys(hashtagStatsStore.store).length
    const mostActiveFiveUsers = Object.values(hashtagStatsStore.store)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
    const mostRetweetedFiveUsers = Object.values(hashtagStatsStore.store)
      .sort((a, b) => b.retweet - a.retweet)
      .slice(0, 5)

    const mostTweetedFiveUsers = Object.values(hashtagStatsStore.store)
      .sort((a, b) => b.tweet - a.tweet)
      .slice(0, 5)

    const mostretweetedByOther = Object.values(hashtagStatsStore.store)
      .sort((a, b) => b.getRetweeted - a.getRetweeted)
      .slice(0, 5)

    const mostRepliedFiveUsers = Object.values(hashtagStatsStore.store)
      .sort((a, b) => b.replies - a.replies)
      .slice(0, 5)
    const fiveUsersWithMostReplies = Object.values(hashtagStatsStore.store)
      .sort((a, b) => b.getReplies - a.getReplies)
      .slice(0, 5)

    return {
      activeUsers: lengthOfUsers,
      totalActivity: hashtagStatsStore.totalActivity,
      mostActiveFiveUsers,
      mostRetweetedFiveUsers,
      mostTweetedFiveUsers,
      mostretweetedByOther,
      mostRepliedFiveUsers,
      fiveUsersWithMostReplies,
    }
  },
}
