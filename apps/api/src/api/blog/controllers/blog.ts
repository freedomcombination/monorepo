import { Blog } from '@fc/types'
import { factories } from '@strapi/strapi'
import { errors } from '@strapi/utils'
import { getProfile } from '../../../utils'

export default factories.createCoreController('api::blog.blog', () => {
  return {
    async findOne(ctx) {
      const id = Number(ctx.params.id) || undefined
      const slug = !id && ctx.params.id

      const where = id ? { id: id } : { slug: slug }

      const params = await this.sanitizeQuery(ctx)
      const populate = {
        author: true,
        image: true,
        ...(params.populate as Record<string, boolean>),
      }

      const blog = (await strapi.db.query('api::blog.blog').findOne({
        where,
        ...params,
        populate,
      })) as Blog

      if (!blog) {
        throw new errors.NotFoundError('Blog not found')
      }

      const profile = await getProfile()

      const isLiked =
        profile &&
        (await strapi.db.query('api::blog.blog').count({
          where: {
            ...where,
            likers: { id: profile.id },
          },
        }))

      blog.isLiked = !!isLiked

      // TODO: Remove sensitive author data

      return { data: blog, meta: {} }
    },
    async find(ctx) {
      const response = await super.find(ctx)
      const profile = await getProfile()

      const data = []

      for (const blog of response.data) {
        const { id, attributes } = blog

        const isLiked =
          profile &&
          (await strapi.db.query('api::blog.blog').count({
            where: {
              id,
              likers: { id: profile.id },
            },
          }))

        attributes.isLiked = !!isLiked

        data.push({ id, attributes })
      }

      response.data = data
      return response
    },
    async create(ctx) {
      const result = await super.create(ctx)

      const role = ctx.state?.user?.role?.type

      if (role?.includes('author')) {
        const profile = await getProfile()

        await strapi.entityService.update('api::blog.blog', result.data.id, {
          data: {
            author: profile.id,
          },
        })
      }

      return result
    },
  }
})
