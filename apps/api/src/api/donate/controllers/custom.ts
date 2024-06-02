import { Context } from 'koa'

export default {
  async email(ctx: Context) {
    const result = await strapi.entityService.findOne(
      'api::donate.donate',
      ctx.params.id,
      {},
    )

    await strapi.plugins['email'].services.email.send({
      to: result.email,
      from: process.env.SMTP_USERNAME,
      replyTo: process.env.SMTP_USERNAME,
      subject: 'Bedankt voor je donatie!',
      // TODO: Create a template for this email
      text: 'We hebben je donatie ontvangen en zullen deze zo snel mogelijk verwerken. Bedankt voor je steun!',
    })

    return { message: 'Email sent' }
  },
}
