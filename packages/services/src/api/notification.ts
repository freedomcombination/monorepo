import type { NextApiRequest, NextApiResponse } from 'next'
import webPush from 'web-push'

// import { strapiRequest } from '@fc/lib'

import { getSubscribers } from './subscribe'

export const notificationRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const subscribers = getSubscribers()

  // const subscribersStrapi = await strapiRequest<subs>({
  //   endpoint: "subscribers",
  // })

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

  // todo: customize the notification
  const payload = JSON.stringify({
    title: 'Are you ready?',
    message: 'The event is about to start!',
  })

  try {
    await Promise.all(
      subscribers.map(async subscription => {
        try {
          await webPush.sendNotification(subscription, payload)
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
