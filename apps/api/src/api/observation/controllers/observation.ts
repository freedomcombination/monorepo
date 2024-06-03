/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * observation controller
 */

import { factories } from '@strapi/strapi'
import { getProfile } from '../../../utils'

export default factories.createCoreController(
  'api::observation.observation',
  ({ strapi }) => ({
    async create(ctx: any) {
      const profile = await getProfile(ctx, true)

      const result = await strapi.entityService.create(
        'api::observation.observation',
        {
          data: {
            ...ctx.request.body?.data,
            creator: profile?.id,
          },
        },
      )

      return result
    },
  }),
)
