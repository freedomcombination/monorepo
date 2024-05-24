import type { NextApiRequest, NextApiResponse } from 'next'
import webPush from 'web-push'

// ? temporary
const subscribers: any[] = []

// const pushSubscription = {
//   endpoint: '<Push Subscription URL>',
//   keys: {
//     p256dh: '<User Public Encryption Key>',
//     auth: '<User Auth Secret>'
//   }
// };

export const subscribeHandler = (req: NextApiRequest, res: NextApiResponse) => {
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

  // todo: add subscription to subscribers
  const { sub } = req.body
  subscribers.push(sub)

  res.status(201).json({ message: 'Subscription added successfully' })
}

export const getSubscribers = () => subscribers
