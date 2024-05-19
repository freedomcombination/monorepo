import type { NextApiRequest, NextApiResponse } from 'next'
import webPush from 'web-push'

export const notificationRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
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

    const { subscription } = req.body

    webPush.setVapidDetails(
      `mailto:${process.env.WEB_PUSH_EMAIL}`,
      process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
      process.env.WEB_PUSH_PRIVATE_KEY,
    )

    const response = await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Are you ready?',
        message: 'The event is about to start!',
      }),
    )

    res.status(response.statusCode).send(response.body)
  } catch (err: any) {
    if ('statusCode' in err) {
      res.status(err.statusCode).send(err.body)
    } else {
      console.error(err)

      res.status(500).send('Internal server error.')
    }
  }
}
