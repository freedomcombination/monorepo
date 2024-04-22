import {
  Controller,
  ControllerSkeleton,
  EndpointPermission,
  EndpointSkeleton,
  PermissionTree,
  RoleApi,
  RoleControllers,
  RoleTree,
} from './types'

const getApiList = (controller: RoleControllers, value = true) => {
  return Array.from(Object.values(controller)).flatMap(item =>
    Array.from(Object.entries(item))
      .filter(([, val]) => val === value)
      .map(([key]) => key),
  )
}

const convertController = (controller: Controller): RoleApi => {
  const items = Array.from(Object.entries(controller))
  const result: RoleApi = {}
  items.forEach(([key, value]) => {
    result[key] = value.enabled
  })

  return result
}

export const createSkeleton = (ps: RoleTree): EndpointSkeleton[] => {
  const toControllerSkeleton = (controller: RoleControllers) => {
    const result: ControllerSkeleton = {}
    Object.entries(controller).forEach(([key, value]) => {
      result[key] = Array.from(Object.keys(value))
    })

    return result
  }

  return ps.permissions.map(
    p =>
      ({
        endpoint: p.endpoint,
        controllers: toControllerSkeleton(p.controllers),
      }) as EndpointSkeleton,
  )
}

export const convertPermission = (
  permission: PermissionTree,
): EndpointPermission[] => {
  const items = Array.from(Object.entries(permission))
  const newItems = items.map(([key, value]) => {
    const endpoint = key.split('::')[1]
    const controllers = Array.from(Object.entries(value.controllers))
    const result: RoleControllers = {}
    controllers.forEach(([key, value]) => {
      result[key === endpoint ? 'basic' : key] = convertController(value)
    })

    return {
      endpoint,
      controllers: result,
      apis: getApiList(result),
    } as EndpointPermission
  })

  return newItems
}
