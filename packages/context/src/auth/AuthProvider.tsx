import { FC, createContext, useContext, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Auth, Permissions, StrapiEndpoint } from '@fc/types'
import { checkAccessForActions } from '@fc/utils'

import { initialAuthState } from './state'
import { AuthContextType, AuthProviderProps, AuthState } from './types'
import { useUserQuery } from './useUserQuery'

export const AuthContext = createContext<AuthContextType>(initialAuthState)

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  initialState = initialAuthState,
  site,
}) => {
  const {
    data,
    loading,
    setLoading,
    refetch: checkAuth,
  } = useUserQuery(initialState)

  const { user, permissions, roles, profile, token } = data
  const isAdmin = roles.includes('admin')

  const [error, setError] = useState<string | null>(null)
  const [demoPermissions, setDemoPermissions] = useState<Permissions | null>(
    null,
  )
  const authModalDisclosure = useDisclosure()
  const { t } = useTranslation()
  const router = useRouter()

  function checkActionsPermission(
    endpoint: StrapiEndpoint,
    ...actions: string[]
  ): boolean {
    const source = demoPermissions ?? permissions

    return checkAccessForActions(source, endpoint, ...actions) === true
  }

  function canCreate(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'create')
  }

  function canRead(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'find')
  }

  function canUpdate(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'update')
  }

  function canDelete(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'delete')
  }

  function canApprove(endpoint: StrapiEndpoint): boolean {
    return checkActionsPermission(endpoint, 'update')
  }

  const logout = async (): Promise<void> => {
    setLoading(true)

    try {
      await axios.post<Auth>('/api/auth/logout')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
      await checkAuth()

      router.push('/')
    }
  }

  const login = async (
    identifier: string,
    password: string,
  ): Promise<AuthState | void> => {
    setLoading(true)
    try {
      const response = await axios.post<Auth>('/api/auth/login', {
        identifier,
        password,
      })

      if (!response.data?.user) {
        throw response.data
      }

      checkAuth()
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
      setLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    username: string,
    name: string,
  ): Promise<AuthState | void> => {
    setLoading(true)

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

      checkAuth()
    } catch (error: any) {
      setError(error.message)

      throw error?.error?.message || error.message
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        demoPermissions,
        error,
        isAdmin,
        isAuthModalOpen: authModalDisclosure.isOpen,
        loading,
        permissions,
        profile,
        roles,
        token,
        user,
        site,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
