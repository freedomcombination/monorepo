import { NextApiHandler } from 'next'

import { createDonationCheckout } from '@fc/stripe/createDonationCheckout'

export const createDonationHandler: NextApiHandler = async (req, res) => {
  try {
    await createDonationCheckout(req, res)
  } catch (err) {
    res.status(500).json(err)
  }
}
