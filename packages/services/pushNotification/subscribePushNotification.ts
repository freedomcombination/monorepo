import { useMutation } from '@tanstack/react-query'

import { WEB_PUSH_PUBLIC_KEY } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import { useWebPushContext } from '@fc/context/webPush'
import type {
  Site,
  WebPushSubscription,
  Subscriber,
  SubscriberCreateInput,
} from '@fc/types'

import { mutation } from '../common/mutation'

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

    return mutation<Subscriber, SubscriberCreateInput>({
      endpoint: 'subscribers',
      method: 'post',
      body: { subscription, site: site as Site },
      token: token as string,
    })
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
