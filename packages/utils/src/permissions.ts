import { StrapiEndpoint } from '@fc/types'
import {
  SimpleApi,
  SimpleEndpoint,
  SimpleRole,
  StrapiPermission,
} from '@fc/types/src/permissions'

export const extractEndpointNames = (role: SimpleRole): string[] => {
  return Array.from(Object.keys(role.permissions))
}

/**
 * Converts a Strapi permission object to a simplified endpoint object.
 *
 * @param {StrapiPermission} permission - The permission object to convert.
 * @return {SimpleEndpoint} The converted simplified endpoint object.
 */
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

/**
 * Function to convert a plural endpoint to its singular form.
 *
 * Because Strapi uses the plural form of endpoints in its API,
 * we need to convert it to its singular form.
 *
 * and there is an exception for the `users-permissions/roles` endpoint.
 *
 * @param {StrapiEndpoint} endpoint - The endpoint to be converted to singular form
 * @return {string} The singular form of the provided endpoint
 */
export const makeSingular = (endpoint: StrapiEndpoint): string => {
  if (endpoint === 'users-permissions/roles') return 'users-permissions'

  if (endpoint.endsWith('ies')) {
    return endpoint.slice(0, -3) + 'y'
  } else if (endpoint.endsWith('es')) {
    const base = endpoint.slice(0, -2)
    if (
      endpoint.length > 2 &&
      ['x', 's', 'z', 'ch', 'sh'].some(suffix => base.endsWith(suffix))
    ) {
      return base.slice(0, -1)
    }

    return base
  } else if (endpoint.endsWith('s')) {
    return endpoint.slice(0, -1)
  }

  return endpoint
}
