import {
  SimpleApi,
  SimpleEndpoint,
  SimpleRole,
  StrapiPermission,
} from '@fc/types/src/permissions'

export const createSkeleton = (role: SimpleRole): string[] => {
  return Array.from(Object.keys(role.permissions))
}

export const convertToSimple = (
  permission: StrapiPermission,
): SimpleEndpoint => {
  return Object.entries(permission).reduce((acc, [key, value]) => {
    const endpoint = key.split('::')[1]
    const controllers = Object.entries(value.controllers)
    const result = controllers.reduce(
      (acc, [, value]) => ({
        ...acc,
        ...Object.entries(value).reduce((result, [key, value]) => {
          result[key] = value.enabled

          return result
        }, {} as SimpleApi),
      }),
      {},
    )

    return {
      ...acc,
      [endpoint]: result,
    }
  }, {})
}
