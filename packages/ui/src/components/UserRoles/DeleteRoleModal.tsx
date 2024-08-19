import { FC, useEffect, useRef, useState } from 'react'

import { Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  Button,
} from '@fc/chakra'
import { useAuthContext } from '@fc/context'
import { Role } from '@fc/types'
import { deleteRole } from '@fc/utils'

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
    <Dialog
      motionPreset="slide-in-bottom"
      onOpenChange={e => (e.open ? null : onClose())}
      open={isOpen}
      centered
    >
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>{t('delete')}</DialogHeader>
        <DialogCloseButton />
        <DialogBody gap={2}>
          <Text color="red.500" fontWeight="bold" mb={6}>
            Are you sure you want to delete this role?
          </Text>
          {role && (
            <Stack gap={4}>
              <Text>{role.name}</Text>
              <Text>{role.description}</Text>
            </Stack>
          )}
        </DialogBody>
        <DialogFooter>
          <Button ref={cancelRef} onClick={onCloseHandler}>
            {t('cancel')}
          </Button>
          <Button
            colorScheme="red"
            loading={countDown > 0}
            loadingText={`${countDown}`}
            ml={3}
            minW={120}
            onClick={onCloseCompleteHandler}
          >
            {t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
