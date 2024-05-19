import { useEffect, useState } from 'react'

import { Button, Center } from '@chakra-ui/react'

import { base64ToUint8Array } from '@fc/utils'

export const SubToNotification = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  )
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      (window as any).workbox !== undefined
    ) {
      // runs only in browser
      navigator.serviceWorker.ready.then(reg => {
        // getSubscription() only works in HTTPS, retrieves an existing push subscription
        reg.pushManager.getSubscription().then(sub => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
  }, [])

  const subscribeButtonOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async event => {
    if (!process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY) {
      throw new Error('Environment variables supplied not sufficient.')
    }
    if (!registration) {
      console.error('No SW registration available.')

      return
    }
    event.preventDefault()
    // Subscribe to a push server
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      // Push server will use this to auth the app server
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
      ),
    })
    // TODO: you should call your API to save subscription data on the server in order to send web push notification from the server
    setSubscription(sub)
    setIsSubscribed(true)
    console.log('Web push subscribed!')
    console.log(sub)
  }

  const unsubscribeButtonOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async event => {
    if (!subscription) {
      console.error('Web push not subscribed')

      return
    }
    event.preventDefault()
    await subscription.unsubscribe()
    // TODO: you should call your API to delete or invalidate subscription data on the server
    setSubscription(null)
    setIsSubscribed(false)
    console.log('Web push unsubscribed!')
  }

  const sendNotificationButtonOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async event => {
    event.preventDefault()
    if (!subscription) {
      console.error('Web push not subscribed')

      return
    }

    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription,
      }),
    })
  }

  return (
    <Center>
      <Button
        type="button"
        onClick={subscribeButtonOnClick}
        isDisabled={isSubscribed}
      >
        Sub
      </Button>
      <Button
        type="button"
        onClick={unsubscribeButtonOnClick}
        isDisabled={!isSubscribed}
        colorScheme="red"
      >
        Unsub
      </Button>
      <Button
        type="button"
        onClick={sendNotificationButtonOnClick}
        isDisabled={!isSubscribed}
        colorScheme="purple"
      >
        Send Notification
      </Button>
    </Center>
  )
}
