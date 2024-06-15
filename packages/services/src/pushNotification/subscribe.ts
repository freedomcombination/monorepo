import { useMutation } from '@tanstack/react-query'

import { useAuthContext, useWebPushContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import {
  AppSlug,
  WebPushSubscription,
  Subscriber,
  SubscriberCreateInput,
} from '@fc/types'
import { base64ToUint8Array } from '@fc/utils'

export const subscribePushNotification = async (
  registration: ServiceWorkerRegistration | null,
  site: AppSlug | null,
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
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string,
      ),
    })) as unknown as WebPushSubscription

    if (subscription) {
      console.info('Successfully subscribed to push service')
    }

    return Mutation.post<Subscriber, SubscriberCreateInput>(
      'subscribers',
      { subscription, site: site as AppSlug },
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
  const { token } = useAuthContext()
  const { registration, site } = useWebPushContext()

  return useMutation({
    mutationKey: ['create-subscriber'],
    mutationFn: () => subscribePushNotification(registration, site, token),
  })
}

export const unsubscribePushNotification = async (
  registration: ServiceWorkerRegistration | null,
  site: AppSlug | null,
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
  const { token } = useAuthContext()
  const { registration, site } = useWebPushContext()

  return useMutation({
    mutationKey: ['delete-subscriber'],
    mutationFn: () =>
      unsubscribePushNotification(registration, site, token as string),
  })
}
