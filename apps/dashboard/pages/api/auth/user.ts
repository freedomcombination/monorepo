import { NextApiHandler } from 'next'

import { userHandler } from '@fc/services/api/userHandler'

export const dashboardUserRouter: NextApiHandler = async (req, res) => {
  req.query.platform = 'dashboard'

  return userHandler(req, res)
}

export default dashboardUserRouter
