import Stripe from 'stripe'

import { getSecret } from '@fc/secrets'

export const stripe = new Stripe(getSecret('STRIPE_KEY') as string, {
  apiVersion: '2024-04-10',
})
