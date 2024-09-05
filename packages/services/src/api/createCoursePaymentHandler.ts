import { NextApiHandler } from 'next'

import { createCourseCheckout } from '@fc/stripe'

export const createCoursePaymentHandler: NextApiHandler = async (req, res) => {
  try {
    await createCourseCheckout(req, res)
  } catch (err) {
    res.status(500).json(err)
  }
}
