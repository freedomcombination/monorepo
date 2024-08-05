import { FC, useEffect, useRef, useState } from 'react'

import { Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@fc/context'
import { Role } from '@fc/types'
import { deleteRole } from '@fc/utils'

import { Button } from '../Button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '../Modal'

type DeleteRoleModalProps = {
  isOpen: boolean
  id: number
  role?: Role
  onClose: () => void
  onCloseComplete: () => void
  refetchRoles: () => void
}

export const DeleteRoleModal: FC<DeleteRoleModalProps> = ({
  id,
  isOpen,
  onClose,
  role,
  onCloseComplete,
  refetchRoles,
}) => {
  const { t } = useTranslation()
  const cancelRef = useRef<any>()
  const [countDown, setCountDown] = useState(5)
  const { token } = useAuthContext()

  const onCloseCompleteHandler = async () => {
    await deleteRole(id, token ?? '')
    onClose()
    refetchRoles()
    onCloseComplete()
  }

  const onCloseHandler = () => {
    onClose()
    onCloseComplete()
  }

  // this ll hopefully prevent unintended deleting role.
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isOpen) {
      setCountDown(5)
      intervalId = setInterval(() => {
        setCountDown(prevCountdown => {
          if (prevCountdown === 0) {
            clearInterval(intervalId)

            return 0
          }

          return prevCountdown - 1
        })
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isOpen])

  return (
    <Modal
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      centered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('delete')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap={2}>
          <Text color="red.500" fontWeight="bold" mb={6}>
            Are you sure you want to delete this role?
          </Text>
          {role && (
            <Stack gap={4}>
              <Text>{role.name}</Text>
              <Text>{role.description}</Text>
            </Stack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button ref={cancelRef} onClick={onCloseHandler}>
            {t('cancel')}
          </Button>
          <Button
            colorPalette="red"
            isLoading={countDown > 0}
            ml={3}
            minW={120}
            onClick={onCloseCompleteHandler}
          >
            {t('delete')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
