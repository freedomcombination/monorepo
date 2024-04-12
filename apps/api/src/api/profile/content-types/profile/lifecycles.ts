export default {
  async afterCreate({ result }) {
    if (result.isVolunteer) {
      try {
        await strapi.plugins['email'].services.email.send({
          to: 'info@freedomcombination.com',
          from: 'info@freedomcombination.com',
          subject: `New volunteer ${result.name}`,
          html: `<p>Hi, ${result.name} has signed up as a volunteer.</p>`,
        })
      } catch (error) {
        console.error('Error sending volunteer email', error)
      }
    }
  },
}
