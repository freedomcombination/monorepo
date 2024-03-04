import axios from 'axios'
import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { API_URL } from '@fc/config'
import { strapiRequest } from '@fc/lib'
import { sessionOptions } from '@fc/secrets'
import { getSessionUser } from '@fc/services'
import { Auth, Profile } from '@fc/types'

export const resetPasswordRouter: NextApiHandler = async (req, res) => {
  try {
    const response = await axios.post('api/auth/reset-password', req.body, {
      baseURL: API_URL,
    })

    const token = response.data.jwt

    if (!token) {
      return res.json({
        user: null,
        token: null,
      })
    }

    const user = await getSessionUser(token)

    if (!user) {
      return res.json({
        user: null,
        token: null,
      })
    }

    const profileResponse = await strapiRequest<Profile>({
      endpoint: 'profiles',
      filters: {
        user: {
          id: {
            $eq: user.id,
          },
        },
      },
    })

    const profile = profileResponse?.data?.[0] || null

    const auth = { user, profile, token: true }

    const session = await getIronSession<Auth>(req, res, sessionOptions)

    session.user = user
    session.token = token
    session.profileId = profile?.id || null

    await session.save()
    res.json(auth)
  } catch (error: any) {
    console.error('error', error.response?.data)
    if (!error.response?.data?.error.message) {
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      res.json(error.response?.data)
    }
  }
}
