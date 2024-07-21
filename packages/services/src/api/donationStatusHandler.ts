import { NextApiHandler } from 'next'
import Stripe from 'stripe'

import { donationWebhook } from '@fc/stripe'

export const donationStatusHandler: NextApiHandler = async (req, res) => {
  try {
    const event: Stripe.Event = req.body
    if (!event) {
      res.status(500).send('Something went wrong')

      return
    }

    await donationWebhook(event)

    res.status(200).send('complete')
  } catch (err) {
    res.status(500).json(err)
  }
}
