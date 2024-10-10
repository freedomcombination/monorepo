import type { MentionUserData } from '@fc/types'

import { getUserByUsername } from '../../../../libs'

export default {
  async afterCreate({ result }) {
    try {
      if (process.env.NODE_ENV === 'development') return

      const userResult = await getUserByUsername(result.username)

      const user = userResult?.data

      if (!user) return

      const {
        description,
        username,
        public_metrics: { followers_count, following_count: friends_count },
        id,
        location,
        name,
        profile_image_url,
        verified,
      } = user

      const data = {
        description,
        followers_count,
        friends_count,
        id_str: `${id}`,
        location,
        name,
        profile_image_url_https: profile_image_url,
        screen_name: username,
        verified,
      } as MentionUserData

      strapi.entityService.update('api::mention.mention', result.id, {
        data: { data },
      })
    } catch (error) {
      console.error('Error after mention create', error)
      strapi.plugin('sentry').service('sentry').sendError(error)
    }
  },
}
