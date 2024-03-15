import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { strapiRequest } from '@fc/lib'
import { sessionOptions } from '@fc/secrets'
import { Auth } from '@fc/types'

export const userRouter: NextApiHandler = async (req, res) => {
  const session = await getIronSession<Auth>(req, res, sessionOptions)

  if (session.token) {
    const profileResponse = session?.profileId
      ? await strapiRequest({
          endpoint: 'profiles/me',
          token: session.token,
        })
      : null

    const profile = profileResponse?.data || null

    return res.json({
      ...session,
      profile,
    })
  }

  res.json({
    token: null,
    user: null,
  })
}
