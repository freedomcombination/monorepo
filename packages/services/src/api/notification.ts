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

  // todo: customize the notification
  const payload = JSON.stringify({
    title: 'Are you ready?',
    message: 'The event is about to start!',
  })

  try {
    const results = await Promise.allSettled(
      subscribers.data.map(async subscriber => {
        try {
          if (subscriber.subscription === null) {
            console.error('Subscription is null')

            return { status: 'rejected', reason: 'Subscription is null' }
          } else {
            try {
              await webPush.sendNotification(subscriber.subscription, payload)

              return { status: 'fulfilled' }
            } catch (error) {
              return { status: 'rejected', reason: error }
            }
          }
        } catch (err) {
          console.error(err)
        }
      }),
    )

    // Check if all promises are fulfilled
    const allFulfilled = results.every(result => result.status === 'fulfilled')

    if (allFulfilled) {
      res.status(200).json({ message: 'Notifications sent successfully' })
    } else {
      const errors = results.filter(result => result.status === 'rejected')
      console.error('Failed to send some notifications: ', errors)
      res
        .status(500)
        .json({ message: 'Failed to send some notifications', errors })
    }
  } catch (err) {
    console.error('Failed to send notifications: ', err)
    res.status(500).json({ message: 'Failed to send notifications' })
  }
}
