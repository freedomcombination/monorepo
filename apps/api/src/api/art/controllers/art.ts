import { factories } from '@strapi/strapi'

const sendEmail = async art => {
  // do not forget to define your comma seperated EDITOR_EMAILS in your local env
  const editorEmails = process.env.EDITOR_EMAILS?.split(',')

  // populating artist to use in email subject
  const populatedArtist = await strapi.entityService.findOne(
    'api::art.art',
    art.id,
    {
      populate: {
        artist: {
          fields: ['name', 'username'],
        },
      },
    },
  )
  const artist = populatedArtist.artist

  const title = art.title_tr || art.title_nl || art.title_en
  const description =
    art.description_tr || art.description_nl || art.description_en

  if (editorEmails?.length > 0) {
    strapi.plugins['email'].services.email.send({
      to: editorEmails,
      from: 'info@wsvvrijheid.nl',
      subject: `New Art ${title} has been created by ${
        artist.name || artist.username
      }`,
      html: `<table>
      <tr>
        <td>Title:</td>
        <td>${title}</td>
      </tr>
      <tr>
        <td>Description:</td>
        <td>${description}</td>
      </tr>
      <tr>
        <td>Artist:</td>
        <td>${artist.name || artist.username}</td>
      </tr>
      <tr>
        <td>Link:</td>
        <td>View the art <a href="https://dashboard.wsvvrijheid.nl/arts?status=pending">here</a></td>
      </tr>
  </table>`,
    })
  } else {
    console.log('no editor email exists')
  }
}

export default factories.createCoreController('api::art.art', ({ strapi }) => {
  return {
    async create(ctx) {
      const result = await super.create(ctx)

      const updatedArt = await strapi
        .service('api::art.art')
        .update(result.data.id, {
          data: { artist: ctx.state.user.id },
          populate: 'artist',
        })

      await sendEmail(updatedArt)

      return result
    },
  }
})
