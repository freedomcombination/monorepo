import type { NextApiRequest, NextApiResponse } from 'next'

import { API_URL } from '@fc/config/constants'

// Saves subscription data to the server
export const subscribeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { sub } = req.body

  try {
    const res = await fetch(`${API_URL}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: { subscription: sub } }),
    })

    // Todo (improvement): save the ID from response to use it later on when user wants to unsub

    if (!res.ok) {
      const error = await res.json()
      console.error('Error from Strapi: ', error)
      throw new Error('Failed to save subscription to Strapi')
    }
  } catch (error) {
    console.error('ERROR: ', error)
  }

  res.status(201).json({ message: 'Subscription added successfully' })
}
