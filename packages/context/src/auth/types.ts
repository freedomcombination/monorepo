/* eslint-disable no-unused-vars */
import { Dispatch, ReactNode } from 'react'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

import {
  Site,
  Permissions,
  Profile,
  SessionUser,
  StrapiEndpoint,
} from '@fc/types'

export type AuthState = {
  demoPermissions: Permissions | null
  error: string | null
  isAdmin: boolean
  isAuthModalOpen: boolean
  isLoading: boolean
  permissions: Permissions
  profile: Profile | null
  roles: string[]
  token: string | null
  user: SessionUser | null
  site: Site
}

export type AuthActions = {
  canApprove: (endpoint: StrapiEndpoint) => boolean
  canCreate: (endpoint: StrapiEndpoint) => boolean
  canDelete: (endpoint: StrapiEndpoint) => boolean
  canRead: (endpoint: StrapiEndpoint) => boolean
  canUpdate: (endpoint: StrapiEndpoint) => boolean
  checkActionsPermission: (
    endpoint: StrapiEndpoint,
    ...api: string[]
  ) => boolean
  checkAuth: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<AuthState, Error>>
  closeAuthModal: () => void
  login: (identifier: string, password: string) => Promise<AuthState | void>
  logout: () => Promise<void>
  openAuthModal: () => void
  register: (
    email: string,
    password: string,
    username: string,
    name: string,
  ) => Promise<AuthState | void>
  setDemoPermissions: Dispatch<Permissions | null>
}

export type AuthContextType = AuthState & AuthActions

export type AuthProviderProps = {
  children: ReactNode
  initialState?: AuthState
  site: Site
}
