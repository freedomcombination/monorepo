import { factories } from '@strapi/strapi'
import { errors } from '@strapi/utils'
import { getProfile } from '../../../utils'
import { emailTemplates } from '../../../../emails'

const { UnauthorizedError } = errors

const sendEmail = async art => {
  // TODO: Get editor emails from the database
  const editorEmails = process.env.EDITOR_EMAILS?.split(',')

  // populating artist to use in email subject
  const artist = art.artist
  const name = artist.name || artist?.email || 'an artist'
  const title = art.title_tr || art.title_nl || art.title_en

  if (editorEmails?.length > 0) {
    strapi.plugins['email'].services.email.send({
      to: editorEmails,
      from: process.env.SMTP_USERNAME,
      subject: `New Art ${title} has been created by ${name}`,
      html: emailTemplates.renderArtCreated(art),
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
          populate: {
            artist: true,
          },
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
