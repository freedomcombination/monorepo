import { FC, useEffect, useMemo, useState } from 'react'

import {
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaEdit, FaSave } from 'react-icons/fa'
import { FaFilter, FaX } from 'react-icons/fa6'

import { useAuthContext } from '@fc/context'
import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Permissions, Role, RoleInput, StrapiLocale } from '@fc/types'
import { AdminLayout, ContentEditable, PermissionCard } from '@fc/ui'
import { cloneRole, hasDifferences, updateRole } from '@fc/utils'

type RolePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const RolePage: FC<RolePageProps> = () => {
  const { query, push } = useRouter()
  const { token } = useAuthContext()
  const { t } = useTranslation()
  const { setDemoPermissions, demoPermissions } = useAuthContext()
  const [editedRole, setEditedRole] = useState<RoleInput | null>(null)
  const [startSave, setStartSave] = useState(false)
  const [filters, setFilters] = useState<string[]>([])
  const inEditMode = !!demoPermissions

  const roleId = query.id ? Number(query.id) : 1

  const { data, isLoading, refetch } = useStrapiRequest<Role>({
    endpoint: 'users-permissions/roles',
    id: roleId,
    token: token ?? '',
  })

  const role = data?.data
  const filterKeys = Object.keys(role?.permissions ?? {})

  const { data: allRoles } = useStrapiRequest<Role>({
    endpoint: 'users-permissions/roles',
    token: token ?? '',
    fields: ['id', 'name'],
  })

  const goEditMode = (enable: boolean) => {
    if (enable) {
      if (!role || !role.permissions) return

      const roleInput = cloneRole(role)

      setEditedRole(roleInput)

      /*
        The purpose of demoPermissions is to display the changes in the side-bar.
        In previous demonstrations, there were issues where some menu options were missed.
        Even if the admin has no permissions on certain APIs, they would disappear.

        By using demoPermissions, we can strike-through the menu options that have no permissions for this role.
        This ensures that the admin won't miss any items.

        Note: The admin needs to activate editing in the 'roles/:id' route.
      */
      setDemoPermissions(roleInput?.permissions ?? null)
    } else {
      setEditedRole(null)
      setDemoPermissions(null)
    }
  }

  const onChangePermissions = (permission: Permissions) => {
    setDemoPermissions(permission)
    setEditedRole(prev => (prev ? { ...prev, permissions: permission } : null))
  }

  const needSave = useMemo(() => {
    if (!role || !editedRole) return false

    if (role.name !== editedRole.name) return true
    if (role.description !== editedRole.description) return true

    return hasDifferences(role?.permissions, editedRole.permissions)
  }, [editedRole, role])

  useEffect(() => {
    if (!startSave || !editedRole) return
    /*
      This useEffect is triggered when the startSave state or editedRole state changes.
      It is used to save the changes asynchronously and then re-fetch the data.
      While the changes are being saved, certain UI elements are disabled and a spinner is displayed.
      Once the saving process is complete, the startSave state is set to false and the editing mode is exited.
    */

    updateRole(roleId, editedRole, token ?? '')
      .then(async () => {
        await refetch()
      })
      .finally(() => {
        setStartSave(false)
        goEditMode(false)
      })

    return () => setStartSave(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startSave])

  return (
    <AdminLayout
      seo={{ title: isLoading ? 'Loading...' : role?.name }}
      hasBackButton
    >
      <Flex flexDir={'column'} gap={4} maxH={'100vh'} overflow={'hidden'}>
        <HStack justifyContent={'space-between'} flexGrow={0} flexShrink={0}>
          <HStack>
            {role && (
              <Button
                leftIcon={inEditMode ? <FaX /> : <FaEdit />}
                onClick={() => goEditMode(!inEditMode)}
              >
                {t(inEditMode ? 'cancel' : 'edit')}
              </Button>
            )}

            {inEditMode && (
              <Button
                isDisabled={!needSave}
                onClick={() => setStartSave(true)}
                isLoading={startSave || isLoading}
                leftIcon={<FaSave />}
              >
                {t('save')}
              </Button>
            )}
          </HStack>
          <HStack spacing={4}>
            {role && (
              <Menu closeOnSelect={false}>
                <MenuButton
                  aria-label="endpoint-filter"
                  icon={<FaFilter />}
                  variant={'outline'}
                  as={IconButton}
                />
                <MenuList h={400} overflow={'auto'}>
                  <MenuItem onClick={() => setFilters([])}>
                    {t('clear')}
                  </MenuItem>
                  <MenuDivider />
                  <MenuOptionGroup type="checkbox" title="Endpoints">
                    {filterKeys.map(key => (
                      <MenuItemOption
                        key={key}
                        value={key}
                        isChecked={filters.includes(key)}
                        onClick={() =>
                          setFilters(filters =>
                            filters.includes(key)
                              ? filters.filter(k => k !== key)
                              : [...filters, key],
                          )
                        }
                      >
                        {key.split('::')[1]}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            )}
            {allRoles && (
              <Select
                maxW={300}
                aria-label="Select role"
                variant={'outline'}
                onChange={e => {
                  push(
                    `/roles/${(e.target as HTMLSelectElement).value ?? roleId}`,
                  )
                }}
              >
                {allRoles?.data?.map(role => (
                  <option
                    key={role.id}
                    value={role.id}
                    selected={role.id === roleId}
                  >
                    {role.name}
                  </option>
                ))}
              </Select>
            )}
          </HStack>
        </HStack>
        {!role || !role.permissions || isLoading ? (
          <Center>
            <Spinner size={'xl'} />
          </Center>
        ) : (
          <Stack
            bg={'white'}
            p={6}
            borderRadius={'md'}
            flexGrow={1}
            overflow={'auto'}
          >
            <ContentEditable
              value={role.name}
              fontSize={'2xl'}
              onUpdate={e =>
                setEditedRole(prev => (prev ? { ...prev, name: e } : null))
              }
              borderRadius={12}
              border={'1px'}
              borderColor={inEditMode ? 'gray.100' : 'transparent'}
              contentEditable={inEditMode}
            />
            <ContentEditable
              value={role.description}
              fontSize={'lg'}
              borderRadius={12}
              border={'1px'}
              borderColor={inEditMode ? 'gray.100' : 'transparent'}
              onUpdate={e =>
                setEditedRole(prev =>
                  prev ? { ...prev, description: e } : null,
                )
              }
              contentEditable={inEditMode}
            />
            <PermissionCard
              permission={inEditMode ? demoPermissions : role.permissions}
              editable={inEditMode && !isLoading}
              filters={filters}
              onChange={onChangePermissions}
            />
          </Stack>
        )}
      </Flex>
    </AdminLayout>
  )
}

export default RolePage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
