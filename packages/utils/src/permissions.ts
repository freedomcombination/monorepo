import axios from 'axios'
import pluralize from 'pluralize'

import { API_URL } from '@fc/config'
import {
  ControllerGroup,
  EndpointControllers,
  Permissions,
  Role,
  RoleInput,
  StrapiEndpoint,
} from '@fc/types'
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
export const mapPermissions = (
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

  return pluralize.singular(endpoint)
}

export const makePlural = (endpoint: string): string => {
  if (endpoint === 'users-permissions') return 'users-permissions/roles'

  return pluralize(endpoint)
}

export const checkAccessForApis = (
  permissions: Permissions,
  endpoint: StrapiEndpoint,
  ...apis: string[]
): boolean | undefined => {
  const endpointName = makeSingular(endpoint)
  const ep =
    permissions[`api::${endpointName}`] ??
    permissions[`plugin::${endpointName}`]

  if (!ep) {
    console.warn('No endpoint found :', endpoint)

    return undefined
  }

  const controllers = Object.values(ep.controllers)

  for (const api of apis) {
    if (
      !controllers.some(controller => {
        const val = controller[api]
        if (!val || !val.enabled) return false

        return true
      })
    )
      return false
  }

  return true
}

/**
 * Checks if two Permission objects have any differing values in their nested structures.
 *
 * @param oldPerm The first Permission object.
 * @param newPerm The second Permission object.
 * @returns True if there are any differences, false otherwise.
 */
export function hasDifferences(
  oldPerm?: Permissions,
  newPerm?: Permissions,
): boolean | undefined {
  if (!oldPerm || !newPerm) return undefined
  const endpoints = Object.keys(oldPerm)
  for (const endpoint of endpoints) {
    const oldControllers = oldPerm[endpoint].controllers
    if (endpoint in newPerm === false) return undefined
    const newControllers = newPerm[endpoint].controllers
    const groups = Object.keys(oldControllers)

    for (const key of groups) {
      const oldGroup = oldControllers[key]
      const newGroup = newControllers[key]
      const apis = Object.keys(oldGroup)

      for (const api of apis) {
        if (oldGroup[api].enabled !== newGroup[api].enabled) return true
      }
    }
  }

  return false
}

export function getDifferences(
  oldPerm: Permissions,
  newPerm: Permissions,
): Permissions {
  const diff: Permissions = {}
  const endpoints = Object.keys(oldPerm)
  for (const endpoint of endpoints) {
    const oldControllers = oldPerm[endpoint].controllers
    const newControllers = newPerm[endpoint].controllers

    const diffControllers: EndpointControllers = {}

    const groups = Object.keys(oldControllers)
    for (const groupKey of groups) {
      const oldGroup = oldControllers[groupKey]
      const newGroup = newControllers[groupKey]

      const diffGroup: ControllerGroup = {}

      const apis = Object.keys(oldGroup)
      for (const api of apis) {
        if (oldGroup[api].enabled !== newGroup[api].enabled) {
          diffGroup[api] = newGroup[api]
        }
      }

      if (Object.keys(diffGroup).length > 0) {
        diffControllers[groupKey] = diffGroup
      }
    }

    if (Object.keys(diffControllers).length > 0) {
      diff[endpoint] = { controllers: diffControllers }
    }
  }

  return diff
}

export function copyPermission(perm: Permissions): Permissions {
  const copy: Permissions = {}
  for (const key in perm) {
    const controllers: EndpointControllers = {}
    for (const groupKey in perm[key].controllers) {
      const group: ControllerGroup = {}
      for (const [api, apiStatus] of Object.entries(
        perm[key].controllers[groupKey],
      )) {
        group[api] = {
          enabled: apiStatus.enabled,
          policy: apiStatus.policy,
        }
      }
      controllers[groupKey] = group
    }
    copy[key] = { controllers }
  }

  return copy
}

export async function updateRole(
  roleId: number,
  roleData: RoleInput,
  token: string,
) {
  const result = await axios.put(
    `${API_URL}/api/users-permissions/roles/${roleId}`,
    roleData,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  return result.data.ok
}

export async function createRole(roleData: RoleInput, token: string) {
  const result = await axios.post(
    `${API_URL}/api/users-permissions/roles`,
    roleData,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  return result
}

export async function deleteRole(roleId: number, token: string) {
  const result = await axios.delete(
    `${API_URL}/api/users-permissions/roles/${roleId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  return result
}

export function createRoleInput(role: Role): RoleInput | null {
  if (!role.permissions) return null

  return {
    name: role.name,
    description: role.description,
    permissions: copyPermission(role.permissions),
    users: [],
  } as RoleInput
}
