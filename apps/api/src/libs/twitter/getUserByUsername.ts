import { sentry } from '../../utils/sentry'
import { getTwitterClient } from './client'

export const getUserByUsername = async (username: string) => {
  const twitterClient = await getTwitterClient()

  try {
    const response = await twitterClient.v2.userByUsername(username, {
      'user.fields': [
        'public_metrics',
        'profile_image_url',
        'location',
        'verified',
        'description',
      ],
    })

    return response
  } catch (error) {
    console.error('Error getting user by username', error)
    sentry(error)
    return null
  }
}
