import { Context } from 'koa'
import { checkRecaptcha, getProfile, getReferenceModel } from '../../../utils'

export default {
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentBlog = await strapi.entityService.findOne(
      'api::blog.blog',
      id,
      {
        populate: ['localizations.image'],
      },
    )

    const referenceBlog = getReferenceModel(currentBlog)

    const result = await strapi.entityService.update('api::blog.blog', id, {
      data: { image: referenceBlog.image?.id },
    })

    return { data: result }
  },
  async getAuthors() {
    const user = await strapi.entityService.findMany(
      'plugin::users-permissions.user',
      {
        filters: {
          role: {
            type: {
              $containsi: 'author',
            },
          },
        },
      },
    )

    return { data: user }
  },
  async like(ctx: Context) {
    const profile = await getProfile()

    if (!profile) {
      await checkRecaptcha()
    }

    if (profile) {
      await strapi.entityService.update('api::blog.blog', ctx.params.id, {
        data: {
          likers: {
            connect: [profile.id],
          },
        },
      })
    }

    await strapi.db
      .connection('blogs')
      .where('id', ctx.params.id)
      .increment('likes', 1)

    return { data: null }
  },
  async unlike(ctx: Context) {
    const profile = await getProfile()

    if (!profile) {
      await checkRecaptcha()
    }

    if (profile) {
      await strapi.entityService.update('api::blog.blog', ctx.params.id, {
        data: {
          likers: {
            disconnect: [profile.id],
          },
        },
      })
    }

    await strapi.db
      .connection('blogs')
      .where('id', ctx.params.id)
      .increment('likes', -1)

    return { data: null }
  },
  async view(ctx: Context) {
    await checkRecaptcha()

    await strapi.db
      .connection('blogs')
      .where('id', ctx.params.id)
      .increment('views', 1)

    const result = await strapi.entityService.findOne(
      'api::blog.blog',
      ctx.params.id,
    )

    return { data: result }
  },
}
