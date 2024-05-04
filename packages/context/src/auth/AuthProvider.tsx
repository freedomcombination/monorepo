import { FC, createContext, useContext, useEffect, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  Auth,
  Permissions,
  Profile,
  SessionUser,
  StrapiEndpoint,
} from '@fc/types'
import { checkAccessForActions } from '@fc/utils'

import { initialAuthState } from './state'
import { AuthContextType, AuthProviderProps, AuthState } from './types'

export const AuthContext = createContext<AuthContextType>(initialAuthState)

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  initialState = initialAuthState,
}) => {
  // TODO: Use useReducer instead of useState
  const [user, setUser] = useState<SessionUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [roles, setRoles] = useState<string[]>(initialAuthState.roles)
  const [token, setToken] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<Permissions>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [demoPermissions, setDemoPermissions] = useState<Permissions | null>(
    null,
  )
  const authModalDisclosure = useDisclosure()
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (initialState) {
      setUser(initialState.user)
      setRoles(initialState.roles)
      setToken(initialState.token)
      setError(initialState.error)
    }
  }, [initialState])

  function checkActionsPermission(
    endpoint: StrapiEndpoint,
    ...api: string[]
  ): boolean {
    const source = demoPermissions ?? permissions

    return checkAccessForActions(source, endpoint, ...api) === true
  }

  function canCreate(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'create')
  }

  function canRead(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'find', 'findOne')
  }

  function canUpdate(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'update')
  }

  function canDelete(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'delete')
  }

  function canApprove(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'approve')
  }

  const isAdmin = roles.includes('admin')

  const checkAuth = async (): Promise<AuthState> => {
    setIsLoading(true)

    try {
      const response = await axios.get<Auth>('/api/auth/user')

      if (response.data?.user) {
        setUser(response.data?.user)
        setRoles(response.data?.user?.roles)
        setToken(response.data?.token)
        setProfile(response.data?.profile as Profile)
        setPermissions((response.data?.profile as Profile).permissions ?? {})
      }

      return {
        ...response.data,
        roles: response.data?.user?.roles || initialAuthState.roles,
        profile: response.data?.profile || null,
        error: null,
        isAuthModalOpen: false,
        isLoading: false,
        permissions: (response.data?.profile as Profile).permissions ?? {},
        demoPermissions: null,
        isAdmin: response.data?.user?.roles.includes('admin') || false,
      }
    } catch (error: any) {
      setError(error.message)

      return initialAuthState
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setIsLoading(true)

    try {
      await axios.post<Auth>('/api/auth/logout')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setProfile(null)
      setUser(null)
      setToken(null)
      setRoles(initialAuthState.roles)
      setIsLoading(false)
      setPermissions({})

      router.push('/')
    }
  }

  const login = async (
    identifier: string,
    password: string,
  ): Promise<AuthState | void> => {
    setIsLoading(true)
    try {
      const response = await axios.post<Auth>('/api/auth/login', {
        identifier,
        password,
      })

      if (!response.data?.user) {
        throw response.data
      }

      setUser(response.data.user)
      setToken(response.data.token)
      setProfile(response.data.profile)
    } catch (error: any) {
      if (error.response?.data?.message === 'Invalid identifier or password') {
        setError(t('login.wrong-password-username'))
        throw new Error(t('login.wrong-password-username'))
      } else if (error.response?.data?.message) {
        setError(error.response?.data?.message)
        throw new Error('An error occurred. Please contact support.')
      } else {
        setError(error.message)
        throw error
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    username: string,
    name: string,
  ): Promise<AuthState | void> => {
    setIsLoading(true)

    try {
      const response = await axios.post<Auth>('/api/auth/register', {
        email,
        password,
        username,
        name,
      })

      if (!response.data?.user) {
        throw response.data
      }

      setUser(response.data.user)
      setToken(response.data.token)
      setProfile(response.data.profile)
    } catch (error: any) {
      setError(error.message)

      throw error?.error?.message || error.message
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        demoPermissions,
        error,
        isAdmin,
        isAuthModalOpen: authModalDisclosure.isOpen,
        isLoading,
        permissions,
        profile,
        roles,
        token,
        user,
        canApprove,
        canCreate,
        canDelete,
        canRead,
        canUpdate,
        checkActionsPermission,
        checkAuth,
        closeAuthModal: authModalDisclosure.onClose,
        login,
        logout,
        openAuthModal: authModalDisclosure.onOpen,
        register,
        setDemoPermissions,
        setPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
