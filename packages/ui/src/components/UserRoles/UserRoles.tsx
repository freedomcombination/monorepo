import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/hooks'
import { HStack, VStack } from '@chakra-ui/react'
import { TFunction } from 'i18next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaEdit } from 'react-icons/fa'
import { FaCopy, FaTrash, FaUser } from 'react-icons/fa6'
import { TbPlus } from 'react-icons/tb'

import { Button, IconButton, Tooltip } from '@fc/chakra'
import { useAuthContext } from '@fc/context'
import { useStrapiRequest } from '@fc/services'
import { Role } from '@fc/types'

import { CreateRoleModal } from './CreateRoleModal'
import { DeleteRoleModal } from './DeleteRoleModal'
import { ProfileSelectModal } from './ProfileSelectModal'
import { WTable } from '../WTable'

const RoleAction: FC<{
  t: TFunction
  onDelete: () => void
  onCopy: () => void
  onUserAssign: () => void
}> = ({ t, onDelete, onCopy, onUserAssign }) => {
  return (
    <HStack>
      <Tooltip content={t('edit')} positioning={{ placement: 'top' }}>
        <IconButton
          aria-label="Edit role"
          icon={<FaEdit />}
          rounded={'full'}
          variant={'outline'}
          size={'xs'}
          // let onRowClick does its job
        />
      </Tooltip>

      <Tooltip content={t('create')} positioning={{ placement: 'top' }}>
        <IconButton
          aria-label="Duplicate role"
          icon={<FaCopy />}
          rounded={'full'}
          variant={'outline'}
          size={'xs'}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onCopy()
          }}
        />
      </Tooltip>

      <Tooltip content={t('profiles')} positioning={{ placement: 'top' }}>
        <IconButton
          aria-label="Assign users to role"
          icon={<FaUser />}
          rounded={'full'}
          variant={'outline'}
          size={'xs'}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onUserAssign()
          }}
        />
      </Tooltip>

      <Tooltip content={t('delete')} positioning={{ placement: 'top' }}>
        <IconButton
          aria-label="Delete role"
          icon={<FaTrash />}
          colorScheme="red"
          rounded={'full'}
          variant={'outline'}
          size={'xs'}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
        />
      </Tooltip>
    </HStack>
  )
}

export const UserRoles = () => {
  const {
    isOpen: isSaveOpen,
    onOpen: onSaveOpen,
    onClose: onSaveClose,
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()
  const {
    isOpen: isUserAssignOpen,
    onOpen: onUserAssignOpen,
    onClose: onUserAssignClose,
  } = useDisclosure()
  const { token } = useAuthContext()
  const { push } = useRouter()
  const { t } = useTranslation()
  const { data: roles, refetch } = useStrapiRequest<Role>({
    endpoint: 'users-permissions/roles',
    token: token ?? '',
  })
  const [roleBaseId, setRoleBaseId] = useState<number>(0)

  const onClickRow = (index: number, id: number) => {
    push(`/roles/${id}`)
  }

  return (
    <VStack alignItems={'flex-start'} gap={4}>
      <Button leftIcon={<TbPlus />} onClick={onSaveOpen}>
        {t('create')}
      </Button>

      <CreateRoleModal
        isOpen={isSaveOpen}
        refetchRoles={refetch}
        roles={roles?.data}
        roleId={roleBaseId}
        onCloseComplete={() => setRoleBaseId(0)}
        onClose={onSaveClose}
      />

      <DeleteRoleModal
        isOpen={isDeleteOpen}
        id={roleBaseId}
        role={roles?.data.find(role => role.id === roleBaseId)}
        refetchRoles={refetch}
        onClose={onDeleteClose}
        onCloseComplete={() => setRoleBaseId(0)}
      />

      <ProfileSelectModal
        isOpen={isUserAssignOpen}
        role={roles?.data.find(role => role.id === roleBaseId)}
        refetchRoles={refetch}
        onClose={onUserAssignClose}
        onCloseComplete={() => setRoleBaseId(0)}
      />

      <WTable
        data={roles?.data ?? []}
        columns={{
          id: {
            label: 'Actions',
            transform: value => {
              return (
                <RoleAction
                  t={t}
                  onDelete={() => {
                    setRoleBaseId(Number(value))
                    onDeleteOpen()
                  }}
                  onCopy={() => {
                    setRoleBaseId(Number(value))
                    onSaveOpen()
                  }}
                  onUserAssign={() => {
                    setRoleBaseId(Number(value))
                    onUserAssignOpen()
                  }}
                />
              )
            },
          },
          name: {},
          type: {},
          nb_users: {
            label: t('profiles'),
          },
          description: {},
        }}
        onClickRow={onClickRow}
      />
    </VStack>
  )
}
