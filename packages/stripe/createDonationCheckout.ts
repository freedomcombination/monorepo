import { NextApiRequest, NextApiResponse } from 'next'

import { SITE_URL } from '@fc/config/constants'
import { Mutation } from '@fc/lib/mutation'
import { getSecret } from '@fc/secrets'
import type { Donation, DonationCreateInput } from '@fc/types'

import { stripe } from './initStripe'
import { StripeMetaData } from './types'

export const createDonationCheckout = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { amount, name, email, type } = req.body

  // Create blank donation in database
  const donation = await Mutation.post<Donation, DonationCreateInput>(
    'donates',
    { name, email, amount },
    getSecret('TOKEN'),
  )

  const donationId = donation.data?.id

  if (!donationId) {
    res.status(500).send('Error creating donation')

    return
  }

  // Check if customer exists
  const customer = await stripe.customers.list({
    email,
  })

  let customerID = customer.data.length > 0 ? customer.data[0].id : ''
  // Create customer if not exists
  if (customer.data.length === 0) {
    const newCustomer = await stripe.customers.create({
      email,
      name,
    })
    customerID = newCustomer.id
  }

  // Create checkout session for subscription
  const payment = await stripe.checkout.sessions.create({
    payment_method_types: ['ideal', 'card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Donatie',
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
      strapi_id: donationId,
      type: 'donation',
    } satisfies StripeMetaData,
    success_url: `${SITE_URL}/donation/complete?status=success&id=${donationId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/donation/complete?status=cancel`,
  })

  res.status(200).send(payment.url)
}
