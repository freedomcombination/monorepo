import axios from 'axios'
import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { API_URL } from '@fc/config/constants'
import { sessionOptions } from '@fc/secrets'
import { getSessionUser } from '@fc/services/auth/getSessionUser'
import type { Auth, AuthResponse } from '@fc/types'

export const socialAuthHandler: NextApiHandler = async (req, res) => {
  const { provider } = req.query
  if (req.method === 'POST') {
    try {
      let url = `/api/auth/${provider}/callback?access_token=${req.body.access_token}`

      if (provider === 'twitter') {
        url = `/api/auth/${provider}/callback?access_token=${req.body.access_token}&access_secret=${req.body.access_secret}`
      }

      const socialLoginResponse = await axios.get<AuthResponse>(url, {
        baseURL: API_URL,
        headers: {
          Authorization: `Bearer ${req.body.access_token}`,
        },
      })

      const token = socialLoginResponse.data.jwt

      if (!token) {
        return res.json({
          user: null,
          token: null,
        })
      }

      const sessionUser = await getSessionUser(token)

      const auth = { user: sessionUser, token }

      const session = await getIronSession<Auth>(req, res, sessionOptions)

      session.user = auth.user
      session.token = auth.token

      await session.save()
      res.json(auth)
    } catch (error: any) {
      if (!error.response?.data?.error.message) {
        return res.status(500).json({ message: 'Internal server error', error })
      } else {
        const messages = error.response?.data?.error.message

        return res.status(403).json({ message: messages })
      }
    }
  }
}
