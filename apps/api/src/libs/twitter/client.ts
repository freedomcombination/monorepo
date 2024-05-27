import axios from 'axios'
import { TwitterApi } from 'twitter-api-v2'
import { sentry } from '../../utils/sentry'

const twitterClientBearer = new TwitterApi(process.env.BEARER_TOKEN)

export const twitterApiBearer = twitterClientBearer

export const getTwitterClient = async () => {
  try {
    const response = await axios.post(
      'https://api.twitter.com/oauth2/token?grant_type=client_credentials',
      null,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.TWITTER_API_KEY}:${process.env.TWITTER_API_SECRET}`,
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      },
    )

    return new TwitterApi(response.data.access_token)
  } catch (error) {
    console.error('Error while getting Twitter client', error)
    sentry(error)
    return null
  }
}
