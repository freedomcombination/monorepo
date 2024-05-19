import { Context } from 'koa'
import { checkRecaptcha } from '../../../utils'

export default {
  async sendEmail(ctx: Context) {
    await checkRecaptcha(ctx)

    const email = ctx.request.body
    await strapi.plugins['email'].services.email.send(email)
  },
}
