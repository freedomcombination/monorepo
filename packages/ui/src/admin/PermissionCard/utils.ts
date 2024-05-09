import { useQuery } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context'
import { strapiRequest } from '@fc/lib'
import { Role } from '@fc/types'

const getRoles = async (token: string | null) => {
  return await strapiRequest<Role>({
    endpoint: 'users-permissions/roles',
    ...(token ? { token } : {}),
  })
}

const getRole = async (token: string | null, roleId?: number) => {
  return await strapiRequest<Role>({
    endpoint: `users-permissions/roles`,
    id: roleId || 0,
    ...(token ? { token } : {}),
  })
}

export const useRoles = () => {
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(token),
  })
}

export const useRole = (roleId?: number) => {
  const { token } = useAuthContext()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['role', roleId],
    queryFn: () => getRole(token, roleId),
  })

  return {
    data: data?.data,
    isLoading,
    refetch,
  }
}
