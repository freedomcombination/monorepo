/* eslint-disable @typescript-eslint/no-explicit-any */
import { factories } from '@strapi/strapi'
import { checkAdmin, checkOwner, getProfile } from '../../../utils'
// import { checkRecaptcha, getProfile } from '../../../utils'
import { errors } from '@strapi/utils'

export default factories.createCoreController('api::profile.profile', () => {
  return {
    async find(ctx) {
      const isAdmin = checkAdmin(ctx)

      if (isAdmin) return super.find(ctx)

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
    async update(ctx) {
      const isAdmin = checkAdmin(ctx)

      if (isAdmin) return super.update(ctx)

      const isOwner = await checkOwner(ctx, ctx.params.id)

      if (!isOwner) {
        throw new errors.ForbiddenError(
          'You are not authorized to perform this action',
        )
      }

      return super.update(ctx)
    },
  }
})
