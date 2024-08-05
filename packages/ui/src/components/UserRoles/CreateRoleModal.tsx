import { FC, useEffect, useLayoutEffect, useState } from 'react'

import { Select, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@fc/context'
import { strapiRequest } from '@fc/lib'
import { RoleInput, Role } from '@fc/types'
import { createRole } from '@fc/utils'

import { Button } from '../Button'
import { Input } from '../Input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from '../Modal'

type CreateRoleModalProps = {
  isOpen: boolean
  roleId: number
  refetchRoles: () => void
  onClose: () => void
  onCloseComplete: () => void
  roles?: Role[]
}

export const CreateRoleModal: FC<CreateRoleModalProps> = ({
  isOpen,
  roleId,
  refetchRoles,
  onCloseComplete,
  onClose,
  roles = [],
}) => {
  const [roleBaseId, setRoleBaseId] = useState<number>(roleId)
  const [roleName, setRoleName] = useState<string>('')
  const [roleDescription, setRoleDescription] = useState<string>('')
  const [startCreate, setStartCreate] = useState(false)
  const { t } = useTranslation()
  const { token } = useAuthContext()

  useLayoutEffect(() => {
    setRoleBaseId(roleId)
  }, [roleId])

  useEffect(() => {
    if (!startCreate) return

    const createRoleAsync = async () => {
      const roleCreate: RoleInput = {
        name: roleName,
        description: roleDescription,
        permissions: {},
        users: [],
      }

      if (roleBaseId) {
        const result = await strapiRequest<Role>({
          endpoint: 'users-permissions/roles',
          token: token ?? '',
          id: roleBaseId,
        })

        roleCreate.permissions = result?.data?.permissions ?? {}

        if (!roleCreate.name) {
          roleCreate.name = `${result?.data?.name} - ${Date.now()}`
        }

        if (!roleCreate.description) {
          roleCreate.description = result?.data?.description
        }
      }

      return await createRole(roleCreate, token ?? '')
    }

    createRoleAsync()
      .then(() => {
        refetchRoles()
      })
      .finally(() => {
        setStartCreate(false)
        onClose()
      })

    return () => setStartCreate(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startCreate])

  return (
    <Modal
      centered
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      size={'xl'}
      scrollBehavior={'inside'}
      closeOnOverlayClick={!startCreate}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('create')}</ModalHeader>
        {!startCreate && <ModalCloseButton />}
        <ModalBody gap={2}>
          <Text>Base from: </Text>
          <Select
            aria-label="Select base role"
            placeholder="Select base role"
            disabled={startCreate}
            variant={'outline'}
            onChange={e => {
              setRoleBaseId(Number(e.target.value))
            }}
          >
            {roles?.map(role => (
              <option
                key={role.id}
                value={role.id}
                selected={role.id === roleBaseId}
              >
                {role.name}
              </option>
            ))}
          </Select>
          <Text>Name: </Text>
          <Input
            variant={'outline'}
            disabled={startCreate}
            onChange={e => setRoleName(e.target.value)}
          />
          <Text>Description: </Text>
          <Input
            variant={'outline'}
            disabled={startCreate}
            onChange={e => setRoleDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter gap={6}>
          <Button disabled={startCreate}>{t('cancel')}</Button>
          <Button isLoading={startCreate} onClick={() => setStartCreate(true)}>
            {t('create')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
