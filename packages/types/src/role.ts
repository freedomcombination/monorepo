import { StrapiBase } from './strapi'

export type RoleName =
  | 'AcademyEditor'
  | 'AccountManager'
  | 'Admin'
  | 'All'
  | 'ArtEditor Translator'
  | 'ArtEditor'
  | 'Authenticated'
  | 'Author Translator'
  | 'Author'
  | 'ContentManager Translator'
  | 'ContentManager'
  | 'Kunsthalte Coordinator'
  | 'Jury'
  | 'Platform Coordinator'
  | 'Public'
  | 'Translator'

export type RoleType =
  | 'academyeditor'
  | 'accountmanager'
  | 'admin'
  | 'all'
  | 'arteditor'
  | 'arteditor_translator'
  | 'authenticated'
  | 'author'
  | 'author_translator'
  | 'contentmanager'
  | 'contentmanager_translator'
  | 'jury'
  | 'kunsthaltecoordinator'
  | 'platformcoordinator'
  | 'public'
  | 'translator'

export type Role = Omit<StrapiBase, 'publishedAt'> & {
  description: string
  name: RoleName
  permissions?: Permissions
  type: RoleType
  nb_users?: number
}

/*
export type Permission = Omit<StrapiBase, 'publishedAt'> & {
  action: string
  role?: Role
}
*/

export type APIStatus = {
  enabled: boolean
  policy: string
}

export type ControllerGroup = {
  [key: string]: APIStatus
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
