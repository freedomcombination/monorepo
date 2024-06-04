import { checkRecaptcha, getProfile } from '../../../utils'

export default {
  async sendEmail(ctx) {
    const profile = await getProfile(ctx)

    if (!profile) {
      await checkRecaptcha(ctx)
    }

    // TODO: Select email template based on ctx.request.body.type

    const email = ctx.request.body?.data

    await strapi.plugins['email'].services.email.send(email)

    await strapi.entityService.create('api::audit-log.audit-log', {
      data: {
        action: 'created',
        profile: profile?.id,
        modelId: null,
        uid: 'api::email.email',
        text: `Sent email to ${email.to} with subject ${email.subject}`,
      },
    })

    return { message: 'Email sent' }
  },
}
