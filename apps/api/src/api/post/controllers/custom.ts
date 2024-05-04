import { Context } from 'koa'

import { assignApprover, getProfile, getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await assignApprover(ctx, 'api::post.post', true)

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentPost = await strapi.entityService.findOne(
      'api::post.post',
      id,
      {
        populate: [
          'localizations.hashtag.localizations',
          'localizations.image',
        ],
      },
    )

    const referencePost = getReferenceModel(currentPost)

    let targetHashtag

    if (referencePost.id !== id) {
      const referenceHashtag = referencePost.hashtag

      targetHashtag = referenceHashtag.localizations?.find(
        hashtag => hashtag.locale === currentPost.locale,
      )
    }

    const result = await strapi.entityService.update('api::post.post', id, {
      data: { hashtag: targetHashtag?.id, image: referencePost.image?.id },
    })

    return { data: result }
  },
  async createPosts(ctx: Context) {
    const profile = await getProfile(ctx, true)
    const { data } = ctx.request.body

    if (!Array.isArray(data)) {
      return ctx.throw(400, 'Expected an array of items')
    }

    const resultData = []
    for (const item of data) {
      item.creator = profile.id
      const result = await strapi.entityService.create('api::post.post', {
        data: item,
      })

      resultData.push({
        id: result.id,
        description: result.description,
      })
    }

    return resultData
  },
}
