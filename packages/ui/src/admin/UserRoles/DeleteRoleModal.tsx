import { FC, useEffect, useRef, useState } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthContext } from '@fc/context'
import { StrapiRole } from '@fc/types'
import { deleteRole } from '@fc/utils'

type DeleteRoleModalProps = {
  isOpen: boolean
  id: number
  role?: StrapiRole
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
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{t('delete')}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody gap={2}>
          <Text color="red.500" fontWeight="bold" mb={6}>
            Are you sure you want to delete this role?
          </Text>
          {role && (
            <Stack gap={4}>
              <Text>{role.name}</Text>
              <Text>{role.description}</Text>
            </Stack>
          )}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onCloseHandler}>
            {t('cancel')}
          </Button>
          <Button
            colorScheme="red"
            isLoading={countDown > 0}
            loadingText={`${countDown}`}
            ml={3}
            minW={120}
            onClick={onCloseCompleteHandler}
          >
            {t('delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
