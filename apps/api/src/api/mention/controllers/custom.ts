import { twitterApiBearer } from '../../../libs'
import { sentry } from '../../../utils/sentry'

export default {
  async search(ctx) {
    try {
      const result = await twitterApiBearer.v1.searchUsers(ctx.query.q)
      ctx.send(result.data)
    } catch (error) {
      console.error('Error searching user', error)
      sentry(error)
    }
  },
}
