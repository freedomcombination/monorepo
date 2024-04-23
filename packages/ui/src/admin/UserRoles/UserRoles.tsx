import { useEffect, useState } from 'react'

import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { GroupBase, Select } from 'chakra-react-select'
import { useLocalStorage } from 'react-use'

import { strapiRequest } from '@fc/lib'
import { Role } from '@fc/types'
import { SimpleRole, PermissionTree } from '@fc/types/src/permissions'
import { convertToSimple, createSkeleton } from '@fc/utils'

import { PermissionCard } from '../PermissionCard'

type RoleOption = {
  label: string
  value: number
}

type EndpointOption = {
  label: string
  value: string
}

export const UserRoles = () => {
  const [roles, setRoles] = useState<SimpleRole[] | null>(null)
  const [endpoints, setEndpoints] = useState<string[] | null>(null)
  const [roleFilter, setRoleFilter] = useLocalStorage<RoleOption[]>(
    'role-filter',
    [],
  )
  const [endpointFilter, setEndpointFilter] = useLocalStorage<EndpointOption[]>(
    'endpoint-filter',
    [],
  )

  useEffect(() => {
    const fetchRoles = async () => {
      const list: SimpleRole[] = []
      const { data: roleList } = await strapiRequest<Role>({
        endpoint: 'users-permissions/roles',
      })

      for (const role of roleList) {
        const response = await strapiRequest<Role>({
          endpoint: 'users-permissions/roles',
          id: role.id,
        })

        list.push({
          id: role.id,
          name: role.name,
          description: role.description,
          nb_users: Number(role.nb_users),
          permissions: convertToSimple(
            response.data.permissions as unknown as PermissionTree,
          ),
        })
      }
      setRoles(list)
      setEndpoints(createSkeleton(list[0]))
    }

    fetchRoles()
  }, [])

  const filterRole = (r: SimpleRole) => {
    if (!roleFilter || roleFilter.length === 0) return true

    return roleFilter.some(role => role.value === r.id)
  }

  const updateRole = (r: SimpleRole) => {
    const oldRoles = roles?.filter(role => role.id !== r.id) ?? []
    setRoles([...oldRoles, r])
  }

  return (
    <VStack gap={6}>
      <SimpleGrid width={'100%'} gap={4} columns={{ base: 1, md: 2 }}>
        <VStack alignItems={'flex-start'} flex={1}>
          <Text fontWeight={'bold'}>Filter by role</Text>
          {roles && (
            <Select<RoleOption, boolean, GroupBase<RoleOption>>
              isMulti
              tagVariant="solid"
              closeMenuOnSelect={false}
              closeMenuOnScroll={true}
              defaultValue={roleFilter}
              placeholder={'Filter by role'}
              onChange={value =>
                setRoleFilter(Array.isArray(value) ? value : [value])
              }
              options={roles.map(role => ({
                label: role.name,
                value: role.id,
              }))}
            />
          )}
        </VStack>
        <VStack alignItems={'flex-end'}>
          <Text fontWeight={'bold'}>Filter by endpoint</Text>
          <HStack>
            {endpoints && (
              <Select<EndpointOption, boolean, GroupBase<EndpointOption>>
                isMulti
                tagVariant="solid"
                closeMenuOnSelect={false}
                closeMenuOnScroll={true}
                placeholder={'Filter by endpoint'}
                defaultValue={endpointFilter}
                onChange={value =>
                  setEndpointFilter(Array.isArray(value) ? value : [value])
                }
                options={endpoints.map(ep => ({
                  label: ep,
                  value: ep,
                }))}
              />
            )}
          </HStack>
        </VStack>
      </SimpleGrid>

      <SimpleGrid gap={4} columns={{ base: 1, md: 2, lg: 3 }}>
        {roles
          ?.filter(filterRole)
          .map(role => (
            <PermissionCard
              key={role.id}
              role={role}
              setRole={updateRole}
              filteredEndpoints={endpointFilter?.map(ep => ep.value)}
            />
          ))}
      </SimpleGrid>
    </VStack>
  )
}
