import { Context } from 'koa'
import { errors } from '@strapi/utils'

const { ApplicationError, UnauthorizedError } = errors

export const getProfile = async (
  ctx: Context,
  check?: boolean,
  includePlatform?: boolean,
) => {
  if (!ctx.state.user) {
    if (check) {
      throw new UnauthorizedError('User required')
    }

    return null
  }

  const profileResponse = await strapi.entityService.findMany(
    'api::profile.profile',
    {
      filters: {
        user: { id: { $eq: ctx.state.user.id } },
      },
      ...(includePlatform ? { populate: ['platforms'] } : {}),
    },
  )

  const profile = profileResponse?.[0] || null

  if (check && !profile) {
    throw new ApplicationError('Profile required')
  }

  return profile
}
