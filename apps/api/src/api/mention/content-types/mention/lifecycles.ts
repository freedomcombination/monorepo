import { MentionUserData } from '@fc/types'

import { getUserByUsername } from '../../../../libs'
import { sentry } from '../../../../utils/sentry'

export default {
  async afterCreate({ result }) {
    try {
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
      sentry(error)
    }
  },
}
