import { Attribute, EntityService } from '@strapi/types'
import { errors } from '@strapi/utils'

const { UnauthorizedError, ForbiddenError } = errors

type GetProfileOptions = {
  check?: boolean
  populate?: EntityService.Params.Populate.Any<'api::profile.profile'>
}

export async function getProfile({
  check,
  populate,
}: GetProfileOptions = {}): Promise<
  EntityService.GetValues<
    'api::profile.profile',
    Attribute.GetPopulatableKeys<'api::profile.profile'>
  >
> {
  const ctx = strapi.requestContext.get()

  if (!ctx?.state?.user) {
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
      ...(populate && { populate }),
    },
  )

  const profile = profileResponse?.[0] || null

  if (check && !profile) {
    throw new ForbiddenError('Profile required')
  }

  return profile
}
