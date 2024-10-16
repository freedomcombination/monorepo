/**
 * user-feedback controller
 */

import { factories } from '@strapi/strapi'
import { checkRecaptcha, getProfile } from '../../../utils'

export default factories.createCoreController(
  'api::user-feedback.user-feedback',
  () => {
    return {
      async create(ctx) {
        const profile = await getProfile()

        if (!profile) {
          await checkRecaptcha()
        }

        return super.create(ctx)
      },
    }
  },
)
