import type { NextApiRequest, NextApiResponse } from 'next'
import webPush from 'web-push'

import { strapiRequest } from '@fc/lib'
import { Subscriber } from '@fc/types'

export const notificationRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Invalid request method.')
  }

  if (
    !process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY ||
    !process.env.WEB_PUSH_EMAIL ||
    !process.env.WEB_PUSH_PRIVATE_KEY
  ) {
    throw new Error('Environment variables supplied not sufficient.')
  }

  webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY,
  )

  const subscribers = await strapiRequest<Subscriber>({
    endpoint: 'subscribers',
  })

  if (!subscribers.data || subscribers.data.length === 0) {
    console.error('No subscriptions found')

    return
  }

  // console.log('# # # # subs: ', subscribers.data)

  // todo: customize the notification
  const payload = JSON.stringify({
    title: 'Are you ready?',
    message: 'The event is about to start!',
  })

  try {
    await Promise.all(
      subscribers.data.map(async subscriber => {
        try {
          if (subscriber.subscription === null) {
            console.error('Subscription is null')
          } else {
            await webPush.sendNotification(subscriber.subscription, payload)
          }
        } catch (err) {
          console.error(err)
        }
      }),
    )
    res.status(200).json({ message: 'Notifications sent successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to send notifications' })
  }
}
