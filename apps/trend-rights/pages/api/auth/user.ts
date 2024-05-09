import { NextApiHandler } from 'next'

import { userRouter } from '@fc/services/src/api/user'

export const trendRightsUserRouter: NextApiHandler = async (req, res) => {
  req.query.platform = 'trend-rights'

  return userRouter(req, res)
}

export default trendRightsUserRouter
