import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { Auth } from '@fc/types'

import { AuthState } from './types'

export const useUserQuery = (placeholderData: AuthState) => {
  const userQuery = useQuery<AuthState>({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const response = await axios.get<Auth>('/api/auth/user')
      const { user, token, profile } = response.data || {}

      const roles = user?.roles ?? []
      const permissions = profile?.permissions ?? {}

      return { user, roles, token, profile, permissions } as AuthState
    },
    placeholderData,
  })

  const [authState, setAuthState] = useState<AuthState>(placeholderData)
  const [isLoading, setIsLoading] = useState(userQuery.isLoading)

  useEffect(() => {
    if (userQuery.data) {
      setAuthState(userQuery.data)
    }
  }, [userQuery.data])

  useEffect(() => {
    setIsLoading(userQuery.isLoading)
  }, [userQuery.isLoading])

  return { ...userQuery, data: authState, isLoading, setIsLoading }
}
