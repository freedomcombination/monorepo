import { checkRecaptcha } from '../../../utils'

export default {
  async sendEmail(ctx) {
    await checkRecaptcha(ctx)

    // TODO: Select email template based on ctx.request.body.type

    const email = ctx.request.body
    await strapi.plugins['email'].services.email.send(email)
  },
}
