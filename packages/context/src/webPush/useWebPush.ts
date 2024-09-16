import { useContext, useEffect, useState } from 'react'

import { WebPushSubscription } from '@fc/types'

import { WebPushContext } from './WebPushContext'

export const useWebPush = (enable: boolean) => {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null)
  const [isSupported, setIsSupported] = useState<boolean>(true)

  const [subscription, setSubscription] = useState<WebPushSubscription | null>(
    null,
  )

  useEffect(() => {
    if (!enable) return

    const registerServiceWorker = async () => {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.error('Service worker or Push is not supported')
        setIsSupported(false)

        return
      } else {
        setIsSupported(true)
      }

      const swRegistration = await navigator.serviceWorker.ready

      if (!swRegistration) {
        console.error('Service worker is not registered.')

        return
      }

      const pmSubscription =
        (await swRegistration.pushManager.getSubscription()) as WebPushSubscription | null

      // const isSubscriptionExpired = pmSubscription?.expirationTime
      //   ? Date.now() > pmSubscription.expirationTime - 5 * 60 * 1000
      //   : false

      if (pmSubscription) {
        setSubscription(pmSubscription)
      }

      setRegistration(swRegistration)
    }

    registerServiceWorker()
  }, [enable])

  return {
    registration,
    subscription,
    isSubscribed: !!subscription,
    isSupported,
  }
}

export const useWebPushContext = () => {
  return useContext(WebPushContext)
}
