import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Auth } from '@fc/types'

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
  const [loading, setIsLoading] = useState(userQuery.loading)

  useEffect(() => {
    if (userQuery.data) {
      setAuthState(userQuery.data)
    }
  }, [userQuery.data])

  useEffect(() => {
    setIsLoading(userQuery.loading)
  }, [userQuery.loading])

  return { ...userQuery, data: authState, loading, setIsLoading }
}
