import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { sessionOptions } from '@fc/secrets'
import type { Auth, Profile } from '@fc/types'

import { strapiRequest } from '../common/request'

export const userHandler: NextApiHandler = async (req, res) => {
  const session = await getIronSession<Auth>(req, res, sessionOptions)

  if (session.token) {
    //  const platform = req.query.platform ?? 'common'
    const profileResponse = session?.profileId
      ? await strapiRequest<Profile>({
          endpoint: `profiles/me`,
          token: session.token,
          //  ...(platform ? { id: platform } : {}),
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
