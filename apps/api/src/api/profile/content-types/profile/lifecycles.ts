import { emailTemplates } from '../../../../../emails'

export default {
  async afterCreate({ result }) {
    if (result.isVolunteer) {
      const admins = await strapi.entityService.findMany(
        'api::profile.profile',
        {
          filters: {
            user: { role: { type: { $in: ['admin'] } } },
          },
        },
      )

      const emails = admins.map(admin => admin.email)

      try {
        await strapi.plugins['email'].services.email.send({
          to: 'talipaltas@gmail.com',
          bcc: emails,
          from: 'info@freedomcombination.com',
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
