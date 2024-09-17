import { NextApiRequest, NextApiResponse } from 'next'

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
    returnUrl,
    token,
  } = req.body

  try {
    const payment = await Mutation.post<
      CoursePayment,
      CoursePaymentCreateInput
    >(
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

    const paymentId = payment.data?.id

    if (!paymentId) {
      res.status(500).send('Error creating payment')

      return
    }

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
            },
            unit_amount: amount * 100,
            recurring: type === 'monthly' ? { interval: 'month' } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: type === 'monthly' ? 'subscription' : 'payment',
      customer: customerID,
      metadata: {
        strapi_id: paymentId,
        type: 'course',
        token,
      } satisfies StripeMetaData,
      // returnUrl must come with ? or &
      success_url: `${returnUrl}status=success&id=${paymentId}`,
      cancel_url: `${returnUrl}status=cancel`,
    })

    return res.status(200).json(result.url)
  } catch (err) {
    console.error(err)
    throw err
  }
}
