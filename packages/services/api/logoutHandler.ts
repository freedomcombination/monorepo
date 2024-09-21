import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'

import { sessionOptions } from '@fc/secrets'

export const logoutHandler: NextApiHandler = async (req, res) => {
  const session = await getIronSession(req, res, sessionOptions)
  session.destroy()
  res.json({ user: null, token: null })
}
