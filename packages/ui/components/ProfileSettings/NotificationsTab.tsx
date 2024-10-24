import { useState } from 'react'

import { FormLabel, HStack, Stack, Switch, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useCookie } from 'react-use'

import { useAuthContext } from '@fc/context/auth'
// import { useWebPushContext } from '@fc/context/webPush'
import { useSubscribePushNotificationMutation } from '@fc/services/pushNotification/subscribePushNotification'
import { useUnsubscribePushNotificationMutation } from '@fc/services/pushNotification/unsubscribePushNotification'
import { CookieKey } from '@fc/types'

export const NotificationsTab = () => {
  const { profile, checkAuth } = useAuthContext()
  const toast = useToast()
  const [cookieNotification, updateCookieNotification] = useCookie(
    CookieKey.PUSH_NOTIFICATIONS_SUBSCRIBED,
  )
  const [isLoading, setIsLoading] = useState(false)

  //! isSubsribed from webPushContext returns false information
  // const { isSubscribed, isSupported } = useWebPushContext()
  const subscriberId = profile?.subscriber?.id
  const isSubscribed = !!subscriberId
  const { t } = useTranslation()

  const subscribePushNotificationsMutation =
    useSubscribePushNotificationMutation()
  const unsubscribePushNotificationsMutation =
    useUnsubscribePushNotificationMutation()

  const handleToggleNotifications = () => {
    setIsLoading(true)

    checkAuth()

    if (isSubscribed) {
      // Unsubscribe
      unsubscribePushNotificationsMutation.mutateAsync(undefined, {
        onSuccess: async () => {
          console.log('Unsubscribed successfully')
          updateCookieNotification('false')

          // Re-fetch user's profile to update the sub status
          await checkAuth()

          toast({
            id: 'success-notifications-unsubscribe',
            title: 'Success',
            description: t('unsubscribe.success'),
            status: 'success',
            duration: 10000,
            isClosable: true,
          })
          setIsLoading(false)
        },
        onError: () => {
          console.log('Failed to unsubscribe')
          toast({
            id: 'fail-notifications-unsubscribe',
            title: 'Error',
            description: t('unsubscribe.fail'),
            status: 'error',
            duration: 10000,
            isClosable: true,
          })
          setIsLoading(false)
        },
      })
    } else {
      subscribePushNotificationsMutation.mutateAsync(undefined, {
        onSuccess: async () => {
          console.log('Subscribed successfully')
          updateCookieNotification('true')

          // Re-fetch user's profile to update the sub status
          await checkAuth()

          toast({
            id: 'success-notifications-subscribe',
            title: 'Success',
            description: t('subscribe.success'),
            status: 'success',
            duration: 10000,
            isClosable: true,
          })
          setIsLoading(false)
        },
        onError: () => {
          console.log('Failed to subscribe')
          toast({
            id: 'fail-notifications-subscribe',
            title: 'Error',
            description: t('subscribe.fail'),
            status: 'error',
            duration: 10000,
            isClosable: true,
          })
          setIsLoading(false)
        },
      })
    }
  }

  return (
    <Stack>
      <HStack
        spacing={8}
        display="flex"
        justifyContent={'space-between'}
        bgColor={'whitesmoke'}
        p={2}
        rounded="8px"
      >
        <FormLabel fontSize="larger" mb={0} onClick={() => {}}>
          Notifications
        </FormLabel>
        <Switch
          id="notifications-switch"
          data-testid="switch-notification-subscription"
          isChecked={isSubscribed}
          onChange={handleToggleNotifications}
          isDisabled={isLoading}
          colorScheme="primary"
          size="lg"
        />
      </HStack>
    </Stack>
  )
}
