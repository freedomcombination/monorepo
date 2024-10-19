import { factories } from '@strapi/strapi'
import { EntityService, Attribute } from '@strapi/types'
import { errors } from '@strapi/utils'
import { getProfile } from '../../../utils'
import { emailTemplates } from '../../../../emails'
import { sendReactMailByRoles } from '../../../utils/sendReactMail'

const { UnauthorizedError } = errors

type Art = EntityService.GetValues<
  'api::art.art',
  Attribute.GetPopulatableKeys<'api::art.art'>
>

const sendArtCreatedEmail = async art => {
  await sendReactMailByRoles(
    ['admin', 'arteditor', 'arteditor_translator'],
    async t => await emailTemplates.renderArtCreated(art, t),
  )
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

      await sendArtCreatedEmail(updatedArt)

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
