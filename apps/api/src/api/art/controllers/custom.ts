/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa'
import { checkRecaptcha, getProfile } from '../../../utils'
import { errors } from '@strapi/utils'

const { ApplicationError, ForbiddenError } = errors

export default {
  async approve(ctx: Context) {
    const result = await strapi.entityService.update(
      'api::art.art',
      ctx.params.id,
      {
        data: {
          approvalStatus: 'approved',
          publishedAt: new Date(),
        },
      },
    )

    return { data: result }
  },
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
    try {
      await checkRecaptcha(ctx)

      await strapi.db
        .connection('arts')
        .where('id', ctx.params.id)
        .increment('views', 1)

      const result = await strapi.entityService.findOne(
        'api::art.art',
        ctx.params.id,
      )

      return { data: result }
    } catch (error) {
      console.error('Error in view-art controller:', error)

      if (error instanceof ForbiddenError)
        throw new ForbiddenError(error.message)

      throw new ApplicationError(error.message)
    }
  },
}
