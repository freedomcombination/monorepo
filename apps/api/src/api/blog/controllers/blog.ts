import { Blog } from '@fc/types'
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::blog.blog', () => {
  return {
    async findOne(ctx) {
      const { id, slug } = ctx.params

      const blog = (await strapi.db.query('api::blog.blog').findOne({
        where: id ? { id: id } : { slug: slug },
        populate: { author: true, image: true },
      })) as Blog

      const user = ctx.state.user
      const isLiked =
        user &&
        (await strapi.db.query('api::blog.blog').count({
          where: {
            slug,
            likers: { email: user.email },
          },
        }))

      blog.isLiked = !!isLiked

      const sanitizedBlog = await this.sanitizeOutput(blog, ctx)

      console.log('sanitizedBlog', sanitizedBlog)

      return sanitizedBlog
    },
    async find(ctx) {
      const response = await super.find(ctx)
      const user = ctx.state.user

      const data = []
      for (const blog of response.data) {
        const { id, attributes } = blog

        const isLiked =
          user &&
          (await strapi.db.query('api::blog.blog').count({
            where: {
              id,
              likers: {
                email: user.email,
              },
            },
            select: ['id'],
          }))

        data.push({
          id,
          attributes: {
            ...attributes,
            isLiked: !!isLiked,
          },
        })
      }

      response.data = data
      return response
    },
  }
})
