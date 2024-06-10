import { useEffect, useState, MouseEventHandler } from 'react'

import { Center, useDisclosure } from '@chakra-ui/react'

import { base64ToUint8Array } from '@fc/utils'

import NotificationModal from '../NotificationModal/NotificationModal'

const SubToNotification = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  )
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const registerServiceWorker = async () => {
      // if (!('serviceWorker' in navigator) || !('worker' in window)) {
      //   console.error('Service worker or Push is not supported')

      //   return
      // }
      if (
        typeof window !== 'undefined' &&
        'serviceWorker' in navigator &&
        (window as any).workbox !== undefined
      ) {
        const swRegistration = await navigator.serviceWorker.ready

        if (!swRegistration) {
          console.error('Service worker is not registered.')

          return
        }

        const swSubscription =
          await swRegistration.pushManager.getSubscription()
        const isSubscriptionExpired =
          swSubscription?.expirationTime &&
          Date.now() > swSubscription.expirationTime - 5 * 60 * 1000

        if (swSubscription && !isSubscriptionExpired) {
          setSubscription(swSubscription)
          setIsSubscribed(true)
        }

        setRegistration(swRegistration)
      }
    }

    registerServiceWorker()
  }, [])

  useEffect(() => {
    if (!isSubscribed) {
      const timer = setTimeout(() => {
        setShowModal(true)
        onOpen()
      }, 5500)

      // Clean-up on depend. change
      return () => clearTimeout(timer)
    }
  }, [isSubscribed, onOpen])

  // Subscribes user to the push service.
  const subscribeButtonOnClick: MouseEventHandler<
    HTMLButtonElement
  > = async event => {
    try {
      if (!process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY) {
        throw new Error('Environment variables supplied not sufficient.')
      }

      if (!registration) {
        console.error('Service worker registration is not available.')

        return
      }

      event.preventDefault()

      let sub
      try {
        // Subscribes user to a push server, returns subscription obj
        sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          // Push server will use this to auth the app server
          applicationServerKey: base64ToUint8Array(
            process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
          ),
        })
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            `Failed to subscribe to the push service: ${error.message}`,
          )
        } else {
          throw new Error(
            'Failed to subscribe to the push service: An unknown error',
          )
        }
      }

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            sub,
          }),
        })

        if (!response.ok) {
          throw new Error(
            `Failed to subscribe to the push service: ${response.statusText} `,
          )
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error during fetch: ${error.message}`)
        } else {
          throw new Error('An unknown error occured during fetch')
        }
      }

      setSubscription(sub)
      setIsSubscribed(true)
      console.info('Web push subscribed!')
    } catch (error) {
      console.error('Error during subscription: ', error)
    }
  }

  // TODO: this function could be used in profile settings menu (see buttons below)
  // const unsubscribeButtonOnClick: MouseEventHandler<
  //   HTMLButtonElement
  // > = async event => {
  //   if (!subscription) {
  //     console.error('Web push not subscribed')

  //     return
  //   }

  //   event.preventDefault()

  //   try {
  //     // Unsub from server
  //     await fetch('/api/unsubscribe', {
  //       method: 'POST',
  //       body: JSON.stringify({ subscription }),
  //     })

  //     // Unsub from Push Subscription
  //     await subscription.unsubscribe()
  //   } catch (error) {
  //     console.error('Failed to unsubscribe: ', error)
  //   }

  //   setSubscription(null)
  //   setIsSubscribed(false)
  //   console.info('Web push unsubscribed!')
  // }

  return (
    <Center>
      <NotificationModal
        isOpen={isOpen && showModal}
        onClose={onClose}
        subOnClick={subscribeButtonOnClick}
      />
      {/* TODO: maybe add this sub & unsub part to our new profile settings menu? */}
      {/* <Button
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
      </Button> */}
    </Center>
  )
}

export default SubToNotification
