export type RoleTree = {
  id: number
  name: string
  description: string
  nb_users: number
  permissions: EndpointPermission[]
}

export type ControllerSkeleton = {
  [key: string]: string[]
}

export type EndpointSkeleton = {
  endpoint: string
  controllers: ControllerSkeleton
}

export type RoleApi = {
  [key: string]: boolean
}

export type RoleControllers = {
  [key: string]: RoleApi
}

export type EndpointPermission = {
  endpoint: string
  controllers: RoleControllers
  apis: string[]
}

export type Controller = {
  [key: string]: {
    enabled: boolean
    policy: string
  }
}

export type PermissionTree = {
  [key: string]: {
    controllers: {
      [key: string]: Controller
    }
  }
}
