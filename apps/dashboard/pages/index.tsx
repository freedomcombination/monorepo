import { useEffect, useState } from 'react'

import { Button, Center, Heading } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'

import { useAuthContext } from '@fc/context'
import { RequestCollectionArgs, strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import {
  AccountStats,
  AccountStats as AccountStatsType,
  StrapiLocale,
} from '@fc/types'
import { AdminLayout } from '@fc/ui'

const args: RequestCollectionArgs<AccountStats> = {
  endpoint: 'account-statistics',
  sort: ['date:asc'],
  pageSize: 100,
}

const base64ToUint8Array = (base64: string) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}

const Index = () => {
  const { t } = useTranslation()
  const { user, profile } = useAuthContext()
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
      window.workbox !== undefined
    ) {
      // run only in browser
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
    <>
      <AdminLayout seo={{ title: t('home') }}>
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
        <Center minH={'50vh'}>
          <Heading as={'h1'}>
            {t('welcome')}
            {(user || profile) && ` ${profile?.name || user?.username}`}
          </Heading>
        </Center>
      </AdminLayout>
    </>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['account-stats'],
    queryFn: () => strapiRequest<AccountStatsType>(args),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}

export default Index
