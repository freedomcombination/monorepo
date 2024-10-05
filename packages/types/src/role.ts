import { StrapiBase } from './strapi'

export type Role = Omit<StrapiBase, 'publishedAt'> & {
  description: string
  name: string
  permissions?: Permissions
  type: string
  nb_users?: number
}

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

export type RoleInput = {
  name: string
  description: string
  permissions: Permissions
  users: []
}
