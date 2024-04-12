export default {
  async afterCreate({ result }) {
    if (process.env.IMPORTING === 'true') return

    try {
      // populating feedback so as to get the art and artist info
      const populatedFeedback = await strapi.entityService.findOne(
        'api::feedback.feedback',
        result.id,
        {
          populate: ['art.artist'],
        },
      )

      if (populatedFeedback.art?.artist) {
        const art = populatedFeedback.art
        const artist = art.artist

        strapi.plugins['email'].services.email.send({
          to: artist.email,
          from: 'info@freedomcombination.com',
          subject: `Dear ${artist.name} your art "${art.title_en}" has been ${result.status}`,
          html: `<div>
                  <p>Editor note: ${result.message}</p>
                  <p>View your art in your <a href="${process.env.KUNSTHALTE_SITE_URL}/profile">profile</a></p>
              </div>`,
        })
      } else {
        return `artist does not exist for ${result.id}`
      }
    } catch (error) {
      console.error('Error after feedback create', error)
    }
  },
}
