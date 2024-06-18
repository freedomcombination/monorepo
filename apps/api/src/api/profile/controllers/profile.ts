/* eslint-disable @typescript-eslint/no-explicit-any */
import { factories } from '@strapi/strapi'

import { getProfile, checkAdmin, checkOwner } from '../../../utils'
import utils from '@strapi/utils'
const { ApplicationError } = utils.errors

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

      /*
        there are two places where this function is called:
        - when registering a new user
        - when submitting a join form

        in first case; 
          we need to check if email address has submitted a join form before
          if so, we need to update attach the user to the profile
          otherwise, we need to create a new profile than attach the user

        in second case;
          we need to create a new profile and if mail address has submitted a join form before
          we need to return meaningful error        
      */

      const { email, user } = ctx.request.body.data
      const isRegistering = !!user // user prop is only sended when registering a new user

      // we dont want to use find here because it has modified...
      const profile = await strapi.db
        .query('api::profile.profile')
        .findOne({ where: { email: { $eq: email } } })

      if (profile && !isRegistering) {
        throw new ApplicationError('Profile already exists', {
          code: 'strapi.error.create-profile.profile-already-exist',
        })
      }

      if (!profile) {
        const createdProfile = await super.create(ctx)
        return this.sanitizeOutput(createdProfile, ctx)
      }

      const updatedProfile = await strapi.entityService.update(
        'api::profile.profile',
        profile.id,
        {
          data: {
            user: ctx.state?.user?.id,
          },
        },
      )

      return this.sanitizeOutput(updatedProfile, ctx)
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
