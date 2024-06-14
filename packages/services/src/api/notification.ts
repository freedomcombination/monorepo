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

    return res.status(404).json({ message: 'No subscriptions found' })
  }

  const payload = req.body

  if (!payload) {
    return res.status(400).json({ message: 'Payload is required' })
  }

  try {
    const results = await Promise.allSettled(
      subscribers.data.map(async subscriber => {
        if (subscriber.subscription === null) {
          return { status: 'rejected', reason: 'Subscription is null' }
        }

        await webPush.sendNotification(subscriber.subscription, payload)

        return { status: 'fulfilled' }
      }),
    )

    // Check if all promises are fulfilled
    const hasFailed = results.some(result => result.status === 'rejected')

    if (hasFailed) {
      const errors = results.filter(result => result.status === 'rejected')
      console.error('Failed to send some notifications: ', errors)

      return res
        .status(500)
        .json({ message: 'Failed to send some notifications', errors })
    }

    res.status(200).json({ message: 'Notifications sent successfully' })
  } catch (err) {
    console.error('Failed to send notifications: ', err)
    res.status(500).json({ message: 'Failed to send notifications' })
  }
}
