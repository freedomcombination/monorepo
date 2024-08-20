import { NextApiRequest, NextApiResponse } from 'next'

import { SITE_URL } from '@fc/config'
import { Mutation } from '@fc/lib'
import { CoursePayment, CoursePaymentCreateInput } from '@fc/types'

import { stripe } from './initStripe'
import { StripeMetaData } from './types'

export const createCourseCheckout = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const {
    amount,
    name,
    email,
    type,
    profile,
    courseApplication,
    installmentNumber,
    slug,
    token,
  } = req.body

  console.log(
    amount,
    name,
    email,
    type,
    profile,
    courseApplication,
    installmentNumber,
    slug,
  )
  const payment = await Mutation.post<CoursePayment, CoursePaymentCreateInput>(
    'payments',
    {
      name,
      email,
      amount,
      profile,
      courseApplication,
      installmentNumber,
    },
    token,
  )

  if (process.env.NODE_ENV === 'development')
    return res
      .status(200)
      .json(
        `${SITE_URL}/courses/complete?status=success&id=${0}&session_id={CHECKOUT_SESSION_ID}&slug=${slug}`,
      )

  const customer = await stripe.customers.list({
    email,
  })

  const customerID =
    customer.data.length > 0
      ? customer.data[0].id
      : (
          await stripe.customers.create({
            email,
            name,
          })
        ).id

  const result = await stripe.checkout.sessions.create({
    payment_method_types: ['ideal', 'card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Course fee',
            metadata: {
              strapi_id: payment.id,
              type: 'course',
            } satisfies StripeMetaData,
          },
          unit_amount: amount * 100,
          recurring: type === 'monthly' ? { interval: 'month' } : undefined,
        },
        quantity: 1,
      },
    ],
    mode: type === 'monthly' ? 'subscription' : 'payment',
    customer: customerID,
    success_url: `${SITE_URL}/courses/complete?status=success&id=${payment.id}&session_id={CHECKOUT_SESSION_ID}&slug=${slug}`,
    cancel_url: `${SITE_URL}/courses/complete?status=cancel&slug=${slug}`,
  })

  return res.status(200).json(result.url)
}
