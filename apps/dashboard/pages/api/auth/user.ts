import { NextApiHandler } from 'next'

import { userRouter } from '@fc/services/src/api/user'

export const dashboardUserRouter: NextApiHandler = async (req, res) => {
  req.query.platform = 'dashboard'

  return userRouter(req, res)
}

export default dashboardUserRouter
