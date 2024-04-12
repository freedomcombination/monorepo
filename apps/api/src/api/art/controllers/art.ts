import { factories } from '@strapi/strapi'
import { errors } from '@strapi/utils'
import { getProfile } from '../../../utils'

const { UnauthorizedError } = errors

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
          fields: ['name'],
        },
      },
    },
  )
  const artist = populatedArtist.artist
  const name = artist.name || artist?.email || 'an artist'

  const title = art.title_tr || art.title_nl || art.title_en
  const description =
    art.description_tr || art.description_nl || art.description_en

  if (editorEmails?.length > 0) {
    strapi.plugins['email'].services.email.send({
      to: editorEmails,
      from: 'info@freedomcombination.com',
      subject: `New Art ${title} has been created by ${name}`,
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
        <td>${name}</td>
      </tr>
      <tr>
        <td>Link:</td>
        <td>View the art <a href="https://dashboard.freedomcombination.com/arts?status=pending">here</a></td>
      </tr>
  </table>`,
    })
  } else {
    strapi.log.error('No editor email exists')
  }
}

export default factories.createCoreController('api::art.art', ({ strapi }) => {
  return {
    async create(ctx) {
      if (!ctx.state.user) {
        throw new UnauthorizedError('No user found')
      }

      const profile = await getProfile(ctx, true)

      if (!profile) {
        throw new UnauthorizedError('No artist profile found')
      }

      const result = await super.create(ctx)

      const updatedArt = await strapi.entityService.update(
        'api::art.art',
        result.data.id,
        {
          data: { artist: profile.id },
          populate: 'artist',
        },
      )

      await sendEmail(updatedArt)

      return result
    },
    async find(ctx) {
      const result = await super.find(ctx)

      const profile = await getProfile(ctx)

      const arts = await Promise.all(
        result.data.map(async art => {
          const { id, attributes } = art
          const isLiked =
            profile &&
            (await strapi.entityService.count('api::art.art', {
              filters: {
                id: { $eq: art.id },
                likers: { id: { $in: [profile?.id] } },
              },
            }))

          return {
            id,
            attributes: {
              ...attributes,
              isLiked: !!isLiked,
            },
          }
        }),
      )

      return { ...result, data: arts }
    },
  }
})
