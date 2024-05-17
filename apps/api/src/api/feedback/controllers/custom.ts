import { Context } from 'koa'
import { checkRecaptcha } from '../../../utils'

export default {
  async sendEmail(ctx: Context) {
    await checkRecaptcha(ctx)

    const email = ctx.request.body

    try {
      await strapi.plugins['email'].services.email.send(email)
    } catch (error) {
      console.error(error)
    }
  },
}
