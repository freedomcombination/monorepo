import axios from 'axios'
import pluralize from 'pluralize'

import { API_URL } from '@fc/config/constants'
import type {
  ControllerGroup,
  EndpointControllers,
  Permissions,
  Role,
  RoleInput,
  StrapiEndpoint,
} from '@fc/types'

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

export const checkAccessForActions = (
  permissions: Permissions,
  endpoint: StrapiEndpoint,
  ...actions: string[]
) => {
  const endpointName = makeSingular(endpoint)
  const ep =
    permissions[`api::${endpointName}`] ??
    permissions[`plugin::${endpointName}`]

  if (!ep) return false

  const controllers = Object.values(ep.controllers)

  for (const action of actions) {
    if (
      !controllers.some(controller => {
        const val = controller[action]
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
export function hasDifferences(oldPerm?: Permissions, newPerm?: Permissions) {
  if (!oldPerm || !newPerm) return false

  const endpoints = Object.keys(oldPerm)

  for (const endpoint of endpoints) {
    const oldControllers = oldPerm[endpoint].controllers

    if (endpoint in newPerm === false) return false

    const newControllers = newPerm[endpoint].controllers
    const groups = Object.keys(oldControllers)

    for (const key of groups) {
      const oldGroup = oldControllers[key]
      const newGroup = newControllers[key]
      const actions = Object.keys(oldGroup)

      for (const action of actions) {
        if (oldGroup[action].enabled !== newGroup[action].enabled) return true
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
      const actionNames = Object.keys(oldGroup)

      for (const actionName of actionNames) {
        if (oldGroup[actionName].enabled !== newGroup[actionName].enabled) {
          diffGroup[actionName] = newGroup[actionName]
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

export function clonePermission(perm: Permissions): Permissions {
  const copy: Permissions = {}

  for (const key in perm) {
    const controllers: EndpointControllers = {}

    for (const groupKey in perm[key].controllers) {
      const group: ControllerGroup = {}

      for (const [api, action] of Object.entries(
        perm[key].controllers[groupKey],
      )) {
        group[api] = {
          enabled: action.enabled,
          policy: action.policy,
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

export function cloneRole(role: Role): RoleInput | null {
  if (!role.permissions) return null

  return {
    name: role.name,
    description: role.description,
    permissions: clonePermission(role.permissions),
    users: [],
  }
}
