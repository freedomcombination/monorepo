/**
 * user-feedback controller
 */

import { factories } from '@strapi/strapi'
import { checkRecaptcha } from '../../../utils'

export default factories.createCoreController(
  'api::user-feedback.user-feedback',
  () => {
    return {
      async create(ctx) {
        await checkRecaptcha()

        return super.create(ctx)
      },
    }
  },
)
