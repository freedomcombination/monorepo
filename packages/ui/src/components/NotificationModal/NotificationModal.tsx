import { useEffect } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useCookie } from 'react-use'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@fc/chakra'
import { useAuthContext, useWebPushContext } from '@fc/context'
import { useSubscribePushNotificationMutation } from '@fc/services'
import { CookieKey } from '@fc/types'

export const NotificationModal = () => {
  const { t } = useTranslation()

  const { open, onOpen, onClose, onToggle } = useDisclosure()
  const { user, site } = useAuthContext()
  const { isSubscribed, isSupported } = useWebPushContext()

  const [cookieNotification, updateCookieNotification] = useCookie(
    CookieKey.PUSH_NOTIFICATIONS_SUBSCRIBED,
  )

  const subscribePushNotificationMutation =
    useSubscribePushNotificationMutation()

  const handleSubscribe = async () => {
    subscribePushNotificationMutation.mutateAsync(undefined, {
      onSuccess: () => {
        updateCookieNotification('true')
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

    if (!isSubscribed && isSupported && cookieNotification !== 'true') {
      const timer = setTimeout(() => {
        onOpen()
      }, 3000)

      // Clean-up on depend. change
      return () => clearTimeout(timer)
    }
  }, [isSubscribed, isSupported, user, site, cookieNotification, onOpen])

  const handleClose = () => {
    onClose()

    // TODO: Set a cookie to prevent showing the modal again
    // Maybe a timeout of 1 week
  }

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal open={open} onOpenChange={onToggle}>
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
            <Button
              data-testid="button-close-notification"
              colorPalette="gray"
              mr={3}
              onClick={handleClose}
            >
              {t('close')}
            </Button>
            <Button
              data-testid="button-subscribe-notification"
              colorPalette="primary"
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
