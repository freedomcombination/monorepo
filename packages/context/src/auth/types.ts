/* eslint-disable no-unused-vars */
import { Dispatch, ReactNode } from 'react'

import {
  Permissions,
  Profile,
  RoleType,
  SessionUser,
  StrapiEndpoint,
} from '@fc/types'

export type AuthState = {
  user: SessionUser | null
  profile: Profile | null
  roles: RoleType[]
  isLoading: boolean
  token: string | null
  isAuthModalOpen: boolean
  error: string | null
  permissions: Permissions
  demoPermissions: Permissions | null
}

export type AuthActions = {
  login: (identifier: string, password: string) => Promise<AuthState | void>
  logout: () => Promise<void>
  openAuthModal: () => void
  closeAuthModal: () => void
  checkAuth: () => Promise<AuthState>
  setPermissions: Dispatch<Permissions>
  setDemoPermissions: Dispatch<Permissions | null>
  register: (
    email: string,
    password: string,
    username: string,
    name: string,
  ) => Promise<AuthState | void>
  canCreate: (endpoint: StrapiEndpoint) => boolean
  canRead: (endpoint: StrapiEndpoint) => boolean
  canUpdate: (endpoint: StrapiEndpoint) => boolean
  canDelete: (endpoint: StrapiEndpoint) => boolean
  checkActionsPermission: (
    endpoint: StrapiEndpoint,
    ...api: string[]
  ) => boolean
  isAdmin: () => boolean
}

export type AuthContextType = AuthState & AuthActions

export type AuthProviderProps = {
  children: ReactNode
  initialState?: AuthState
}
