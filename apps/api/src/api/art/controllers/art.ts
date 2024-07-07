import { emailTemplates } from '@fc/email'
import { factories } from '@strapi/strapi'
import { Attribute, EntityService } from '@strapi/types'
import { errors } from '@strapi/utils'

import { getProfile } from '../../../utils'

const { UnauthorizedError } = errors

type Art = EntityService.GetValues<
  'api::art.art',
  Attribute.GetPopulatableKeys<'api::art.art'>
>

const sendArtCreatedEmail = async art => {
  // TODO: Get editor emails from the database
  const editors = await strapi.entityService.findMany(
    'plugin::users-permissions.user',
    {
      filters: {
        role: {
          type: {
            $in: ['admin', 'arteditor', 'arteditor_translator'],
          },
        },
      },
    },
  )
  const editorEmails = editors.map(editor => editor.email)

  if (editorEmails.length === 0) {
    strapi.log.error('No editor email exists')

    return
  }

  // populating artist to use in email subject
  const artist = art.artist
  const name = artist.name || artist?.email || 'an artist'
  const title = art.title_tr || art.title_nl || art.title_en

  await strapi.plugins['email'].services.email.send({
    to: editorEmails,
    from: process.env.SMTP_USERNAME,
    subject: `New Art: ${title} - ${name}`,
    html: emailTemplates.renderArtCreated(art),
  })
}

export default factories.createCoreController('api::art.art', ({ strapi }) => {
  return {
    async create(ctx) {
      if (!ctx.state.user) {
        throw new UnauthorizedError('No user found')
      }

      const profile = await getProfile({ check: true })

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

      if (process.env.VERCEL_ENV === 'production') {
        await sendArtCreatedEmail(updatedArt)
      }

      return result
    },
    async find(ctx) {
      const sanitizedQueryParams = await this.sanitizeQuery(ctx)

      const filters = ctx.query.filters || {}
      // Sanitize query removes artist filter since profile endpoint is not allowed for all roles or public
      sanitizedQueryParams.filters = filters

      const { results, pagination } = await strapi
        .service('api::art.art')
        .find(sanitizedQueryParams)

      const profile = await getProfile()

      const artResults = results as Art[]

      const arts = await Promise.all(
        artResults.map(async art => {
          const { id, ...attributes } = art
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
              artist: {
                ...attributes.artist,
                // Remove sensitive data
                user: null,
              },
              isLiked: !!isLiked,
            },
          }
        }),
      )

      const sanitizedResults = await this.sanitizeOutput(arts, ctx)

      return this.transformResponse(sanitizedResults, { pagination })
    },
  }
})
