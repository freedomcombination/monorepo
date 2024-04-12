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
      from: 'info@freedomcombination.com',
      replyTo: 'info@freedomcombination.com',
      subject: 'Bedankt voor je donatie!',
      text: 'We hebben je donatie ontvangen en zullen deze zo snel mogelijk verwerken. Bedankt voor je steun!',
    })

    return { message: 'Email sent' }
  },
}
