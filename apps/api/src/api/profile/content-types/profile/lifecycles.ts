import { emailTemplates } from '../../../../../emails'

export default {
  async afterCreate({ result }) {
    if (result.isVolunteer) {
      // TODO: Get admin and hr emails to send to
      try {
        await strapi.plugins['email'].services.email.send({
          to: 'info@freedomcombination.com',
          from: 'info@freedomcombination.com',
          subject: `New volunteer ${result.name}`,
          html: emailTemplates.renderVolunteerApplied(result),
        })
      } catch (error) {
        console.error('Error sending volunteer email', error)
      }
    }
  },
}
