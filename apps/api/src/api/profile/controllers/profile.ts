import { factories } from '@strapi/strapi'
import { getProfile } from '../../../utils'

export default factories.createCoreController('api::profile.profile', () => {
  return {
    async find(ctx) {
      if (ctx.state.user?.role?.type === 'admin') return super.find(ctx)

      const profile = await getProfile(ctx, true, true)
      if (profile.platforms.length === 0) {
        throw new Error('No platforms found')
      }

      const sanitizedQueryParams = await this.sanitizeQuery(ctx)
      const filters = sanitizedQueryParams.filters as Record<string, unknown>
      const platformIds = profile.platforms.map(platform => platform.id)

      sanitizedQueryParams.filters = {
        $and: [
          ...(filters ? [filters] : []),
          {
            platforms: {
              $in: platformIds,
            },
          },
        ],
      }

      const { results, pagination } = await strapi
        .service('api::profile.profile')
        .find(sanitizedQueryParams)

      const sanitizedResults = await this.sanitizeOutput(results, ctx)

      return this.transformResponse(sanitizedResults, { pagination })
    },
  }
})
