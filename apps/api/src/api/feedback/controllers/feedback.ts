import { factories } from '@strapi/strapi'
import { errors } from '@strapi/utils'
import { getProfile } from '../../../utils'

const { UnauthorizedError } = errors

export default factories.createCoreController(
  'api::feedback.feedback',
  ({ strapi }) => {
    return {
      async create(ctx) {
        if (!ctx.state.user) {
          throw new UnauthorizedError(
            'You must be logged in to perform this action',
          )
        }

        const profile = await getProfile({ check: true })

        if (!profile) {
          throw new UnauthorizedError('No editor profile found')
        }

        const result = await super.create(ctx)

        await strapi.entityService.update(
          'api::feedback.feedback',
          result.data.id,
          { data: { editor: profile.id } },
        )

        return result
      },
    }
  },
)
