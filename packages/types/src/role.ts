import { StrapiBase } from './strapi'

export type StrapiRole = Omit<StrapiBase, 'publishedAt'> & {
  description: string
  name: string
  permissions?: Permissions
  type: string
  nb_users?: number
}

/*
export type Permission = Omit<StrapiBase, 'publishedAt'> & {
  action: string
  role?: Role
}
*/

export type EndpointAction = {
  enabled: boolean
  policy: string
}

export type ControllerGroup = {
  [key: string]: EndpointAction
}

export type EndpointControllers = {
  [key: string]: ControllerGroup
} & {
  backup?: { [key: string]: ControllerGroup }
}

export type Permissions = {
  [key: string]: {
    controllers: EndpointControllers
  }
}

export type Role = {
  name: string
  description: string
  permissions: Permissions
  users: []
}
