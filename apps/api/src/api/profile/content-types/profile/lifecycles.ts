import { emailTemplates } from '../../../../../emails'

export default {
  async afterCreate({ result }) {
    if (result.isVolunteer) {
      const admins = await strapi.entityService.findMany(
        'api::profile.profile',
        {
          filters: {
            user: { role: { type: { $in: ['admin', 'humanresource'] } } },
          },
        },
      )

      const emails = admins.map(admin => admin.email)

      try {
        await strapi.plugins['email'].services.email.send({
          to: process.env.SMTP_USERNAME,
          bcc: emails,
          from: process.env.SMTP_USERNAME,
          subject: `New volunteer ${result.name}`,
          html: emailTemplates.renderVolunteerApplied(result),
        })
      } catch (error) {
        console.error('Error sending volunteer email', error)
        strapi.plugin('sentry').service('sentry').sendError(error)
      }
    }
  },
}
