/* eslint-disable @typescript-eslint/no-explicit-any */
import { factories } from '@strapi/strapi'
import { getProfile } from '../../../utils'
// import { checkRecaptcha, getProfile } from '../../../utils'

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
    async create(ctx: any) {
      //  if (ctx.request.body?.data?.recaptchaToken) await checkRecaptcha(ctx)

      const { email } = ctx.request.body.data

      // we dont want to use find here because it has modified...
      const profileResults = await strapi.db
        .query('api::profile.profile')
        .findMany({
          where: { email: { $eq: email } },
        })

      if (!profileResults || profileResults.length === 0) {
        // no registered profile before
        return super.create(ctx)
      }

      const profile = profileResults[0]

      const createdProfile = await strapi.entityService.update(
        'api::profile.profile',
        profile.id,
        {
          data: {
            user: ctx.state?.user?.id,
          },
        },
      )

      return this.sanitizeOutput(createdProfile, ctx)
    },
  }
})
