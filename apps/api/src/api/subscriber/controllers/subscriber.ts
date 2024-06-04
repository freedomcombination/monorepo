/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * subscriber controller
 */

import { factories } from '@strapi/strapi'
import { getProfile } from '../../../utils'

export default factories.createCoreController('api::subscriber.subscriber', {
  async create(ctx: any) {
    const profile = await getProfile(ctx)
    const { data } = ctx.request.body

    const result = await strapi.entityService.create(
      'api::subscriber.subscriber',
      {
        data: {
          ...data,
          profile: profile?.id,
        },
      },
    )

    return {
      data: result,
    }
  },
})
