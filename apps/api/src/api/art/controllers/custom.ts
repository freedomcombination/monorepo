/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa'
import { checkRecaptcha, getProfile } from '../../../utils'

export default {
  async like(ctx: Context) {
    await checkRecaptcha(ctx)

    const profile = await getProfile(ctx)

    if (profile) {
      const isLikedCount = await strapi.entityService.count('api::art.art', {
        filters: {
          id: { $eq: ctx.params.id },
          likers: { id: { $eq: profile.id } },
        },
      })

      if (!isLikedCount) {
        await strapi.entityService.update('api::art.art', ctx.params.id, {
          data: {
            likers: {
              ['connect']: [profile.id as number],
            },
          },
        })
      } else {
        return { data: null }
      }
    }

    await strapi.db
      .connection('arts')
      .where('id', ctx.params.id)
      .increment('likes', 1)

    return { data: null }
  },
  async unlike(ctx: Context) {
    await checkRecaptcha(ctx)

    const profile = await getProfile(ctx)

    if (profile) {
      const isLikedCount = await strapi.entityService.count('api::art.art', {
        filters: {
          id: { $eq: ctx.params.id },
          likers: { id: { $eq: profile.id } },
        },
      })

      if (isLikedCount) {
        await strapi.entityService.update('api::art.art', ctx.params.id, {
          data: {
            likers: {
              ['disconnect']: [profile.id as number],
            },
          },
        })
      } else {
        return { data: null }
      }
    }

    await strapi.db
      .connection('arts')
      .where('id', ctx.params.id)
      .increment('likes', -1)

    return { data: null }
  },
  async view(ctx: Context) {
    await strapi.db
      .connection('arts')
      .where('id', ctx.params.id)
      .increment('views', 1)

    const result = await strapi.entityService.findOne(
      'api::art.art',
      ctx.params.id,
    )

    return { data: result }
  },
}
