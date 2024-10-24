import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import { useWebPushContext } from '@fc/context/webPush'
import { Site, Subscriber } from '@fc/types'

import { mutation } from '../common/mutation'

export const unsubscribePushNotification = async (
  registration: ServiceWorkerRegistration | null,
  site: Site | null,
  token: string,
  subscriberId: number | undefined,
) => {
  const subscription = await registration?.pushManager.getSubscription()
  await subscription?.unsubscribe()
  await registration?.unregister()

  // TODO: Remove
  console.info(site, token, subscriberId)

  if (!subscriberId) {
    console.log('Could not find subscriber')

    return
  }

  return mutation<Subscriber>({
    endpoint: `subscribers`,
    method: 'delete',
    token,
    id: subscriberId,
  })

  // TODO: Create a custom delete endpoint to delete the subscriber
  // TODO: User the token adn site to delete the subscriber
}

export const useUnsubscribePushNotificationMutation = () => {
  const { token, site } = useAuthContext()
  const { registration } = useWebPushContext()
  const { profile } = useAuthContext()
  const subscriberId = profile?.subscriber?.id

  return useMutation({
    mutationKey: ['delete-subscriber'],
    mutationFn: () =>
      unsubscribePushNotification(
        registration,
        site,
        token as string,
        subscriberId,
      ),
  })
}
