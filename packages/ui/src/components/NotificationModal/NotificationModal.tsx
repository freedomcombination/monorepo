import { useEffect } from 'react'

import { useDisclosure } from '@chakra-ui/hooks'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useAuthContext, useWebPushContext } from '@fc/context'
import { useSubscribePushNotificationMutation } from '@fc/services'

export const NotificationModal = () => {
  const { t } = useTranslation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, site } = useAuthContext()
  const { isSubscribed, isSupported } = useWebPushContext()

  const subscribePushNotificationMutation =
    useSubscribePushNotificationMutation()

  const handleSubscribe = async () => {
    subscribePushNotificationMutation.mutateAsync(undefined, {
      onSuccess: () => {
        onClose()
      },
      // TODO: Show toast notification
      onError: () => {},
    })
  }

  useEffect(() => {
    // Show dashboard notification modal only if user is logged in
    if (site === 'dashboard' && !user) {
      return
    }

    if (!isSubscribed && isSupported) {
      const timer = setTimeout(() => {
        onOpen()
      }, 3000)

      // Clean-up on depend. change
      return () => clearTimeout(timer)
    }
  }, [isSubscribed, isSupported, user, site, onOpen])

  const handleClose = () => {
    onClose()

    // TODO: Set a cookie to prevent showing the modal again
    // Maybe a timeout of 1 week
  }

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('never-miss-events')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>{t('sub-to-notifications')}</Text>
              <Text fontSize="sm" color="red">
                {t('sub-notifications-mobile-warning')}
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={handleClose}>
              {t('close')}
            </Button>
            <Button
              colorScheme="primary"
              loading={subscribePushNotificationMutation.isPending}
              onClick={handleSubscribe}
            >
              {t('subscribe')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
