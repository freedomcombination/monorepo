import { checkRecaptcha, getProfile } from '../../../utils'
import { errors } from '@strapi/utils'

export default {
  async sendEmail(ctx) {
    const profile = await getProfile(ctx)

    if (!profile) {
      await checkRecaptcha(ctx)
    }

    // TODO: Select email template based on ctx.request.body.type

    const email = ctx.request.body?.data

    if (!email) {
      throw new errors.ValidationError('Invalid email data', {
        errors: {
          data: ctx.request.body,
        },
      })
    }

    await strapi.plugins['email'].services.email.send(email)

    await strapi.entityService.create('api::audit-log.audit-log', {
      data: {
        action: 'created',
        ...(profile && { profile: profile.id }),
        modelId: null,
        uid: 'api::email.email',
        text: `Sent email to ${email.to} with subject ${email.subject}`,
      },
    })

    return { message: 'Email sent' }
  },
}
