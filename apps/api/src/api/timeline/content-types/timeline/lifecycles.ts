import { Attribute } from '@strapi/strapi'
import { getUserByUsername, getUserTweets } from '../../../../libs'

export default {
  async afterCreate({ result }) {
    try {
      if (process.env.NODE_ENV === 'development') return

      const userResult = await getUserByUsername(result.username as string)

      const user = userResult?.data

      if (!user) return

      const tweets = (await getUserTweets(user.id, user)) || []

      await strapi.entityService.update('api::timeline.timeline', result.id, {
        data: {
          userData: {
            id: user.id,
            name: user.name,
            username: user.username,
            profile: user.profile_image_url,
          },
          tweets: tweets as unknown as Attribute.JsonValue,
        },
      })
    } catch (error) {
      console.error('Error updating user tweet', error)
      strapi.plugin('sentry').service('sentry').sendError(error)
    }
  },
}
