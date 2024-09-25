import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import { useWebPushContext } from '@fc/context/webPush'
import { Site } from '@fc/types'

export const unsubscribePushNotification = async (
  registration: ServiceWorkerRegistration | null,
  site: Site | null,
  token: string,
) => {
  const subscription = await registration?.pushManager.getSubscription()
  await subscription?.unsubscribe()
  await registration?.unregister()

  // TODO: Remove
  console.info(site, token)

  // TODO: Create a custom delete endpoint to delete the subscriber
  // TODO: User the token adn site to delete the subscriber
}

export const useUnsubscribePushNotificationMutation = () => {
  const { token, site } = useAuthContext()
  const { registration } = useWebPushContext()

  return useMutation({
    mutationKey: ['delete-subscriber'],
    mutationFn: () =>
      unsubscribePushNotification(registration, site, token as string),
  })
}
