import type { NextApiRequest, NextApiResponse } from 'next'
import webPush from 'web-push'

const Notification = (req: NextApiRequest, res: NextApiResponse) => {
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
  webPush
    .sendNotification(
      subscription,
      JSON.stringify({
        title: 'Are you ready?',
        message: 'The event is about to start!',
      }),
    )
    .then(response => {
      res.writeHead(response.statusCode, response.headers).end(response.body)
    })
    .catch(err => {
      if ('statusCode' in err) {
        res.writeHead(err.statusCode, err.headers).end(err.body)
      } else {
        console.error(err)
        res.statusCode = 500
        res.end()
      }
    })
}

export default Notification
