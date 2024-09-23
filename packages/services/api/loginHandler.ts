import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { sessionOptions } from '@fc/secrets'
import { loginAuth } from '@fc/services/auth/getAuth'
import type { Auth } from '@fc/types'

export const loginHandler: NextApiHandler = async (req, res) => {
  const { identifier, password } = req.body

  try {
    const { profile, ...auth } = await loginAuth(identifier, password)

    const session = await getIronSession<Auth>(req, res, sessionOptions)

    session.user = auth.user
    session.token = auth.token
    session.profileId = profile?.id || null

    await session.save()

    res.json({ ...auth, profile })
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.error('LOGIN_AUTH_ERROR', error.response.data.error)

      return res
        .status(error.response.data.error.status)
        .json({ message: error.response.data.error.message })
    }
    res.status(500).json({ message: 'Something went wrong' })
  }
}
