/* eslint-disable no-unused-vars */
import { Dispatch, ReactNode } from 'react'

import { Profile, RoleType, SessionUser, SimpleEndpoint } from '@fc/types'

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
  permissionCheck: {
    anyEndpoint: (endpoint: string) => boolean
    fullEndpoint: (endpoint: string) => boolean
    apisEndpoint: (endpoint: string, ...api: string[]) => boolean
  }
}

export type AuthContextType = AuthState & AuthActions

export type AuthProviderProps = {
  children: ReactNode
  initialState?: AuthState
}
