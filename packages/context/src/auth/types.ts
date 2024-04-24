/* eslint-disable no-unused-vars */
import { Dispatch, ReactNode } from 'react'

import { Profile, RoleType, SessionUser, SimpleEndpoint, StrapiEndpoint } from '@fc/types'

export type AuthState = {
  user: SessionUser | null
  profile: Profile | null
  roles: RoleType[]
  isLoading: boolean
  token: string | null
  isAuthModalOpen: boolean
  error: string | null
  permissions: SimpleEndpoint
}

export type AuthPermissionFuncs = {
  anyEndpoint: (endpoint: StrapiEndpoint) => boolean
  fullEndpoint: (endpoint: StrapiEndpoint) => boolean
  apisEndpoint: (endpoint: StrapiEndpoint, ...api: string[]) => boolean
  canCreate: (endpoint: StrapiEndpoint) => boolean
  canRead: (endpoint: StrapiEndpoint) => boolean
  canUpdate: (endpoint: StrapiEndpoint) => boolean
  canDelete: (endpoint: StrapiEndpoint) => boolean
  canReadAll: (...endpoint: StrapiEndpoint[]) => boolean
}

export type AuthActions = {
  login: (identifier: string, password: string) => Promise<AuthState | void>
  logout: () => Promise<void>
  openAuthModal: () => void
  closeAuthModal: () => void
  checkAuth: () => Promise<AuthState>
  setPermissions: Dispatch<SimpleEndpoint>
  register: (
    email: string,
    password: string,
    username: string,
    name: string,
  ) => Promise<AuthState | void>
  permissionCheck: AuthPermissionFuncs
}

export type AuthContextType = AuthState & AuthActions

export type AuthProviderProps = {
  children: ReactNode
  initialState?: AuthState
}
