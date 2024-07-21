import { NextApiHandler } from 'next'

import { userHandler } from '@fc/services/src/api/userHandler'

export const trendRightsUserRouter: NextApiHandler = async (req, res) => {
  req.query.platform = 'trend-rights'

  return userHandler(req, res)
}

export default trendRightsUserRouter
