import { useMutation } from '@tanstack/react-query'

import { WEB_PUSH_PUBLIC_KEY } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import { useWebPushContext } from '@fc/context/webPush'
import { Mutation } from '@fc/lib/mutation'
import type {
  Site,
  WebPushSubscription,
  Subscriber,
  SubscriberCreateInput,
} from '@fc/types'

export const subscribePushNotification = async (
  registration: ServiceWorkerRegistration | null,
  site: Site | null,
  token: string | null,
) => {
  try {
    if (!registration) {
      throw new Error('Service worker is not available')
    }

    // Subscribes user to a push server, returns subscription obj
    const subscription = (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      // Push server will use this to auth the app server
      applicationServerKey: WEB_PUSH_PUBLIC_KEY,
    })) as unknown as WebPushSubscription

    if (subscription) {
      console.info('Successfully subscribed to push service')
    }

    return Mutation.post<Subscriber, SubscriberCreateInput>(
      'subscribers',
      { subscription, site: site as Site },
      token as string,
    )
  } catch (error: any) {
    console.error('error', error)
    throw new Error(
      `Failed to subscribe to the push service: ${error.message || 'Unknown error'}`,
    )
  }
}

export const useSubscribePushNotificationMutation = () => {
  const { token, site } = useAuthContext()
  const { registration } = useWebPushContext()

  return useMutation({
    mutationKey: ['create-subscriber'],
    mutationFn: () => subscribePushNotification(registration, site, token),
  })
}

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
