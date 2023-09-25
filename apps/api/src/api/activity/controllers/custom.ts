import { Context } from 'koa'

import { assignApprover, getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await assignApprover(ctx, 'api::activity.activity', true)

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentActivity = await strapi.entityService.findOne(
      'api::activity.activity',
      id,
      {
        populate: ['localizations.image'],
      },
    )

    const referenceActivity = getReferenceModel(currentActivity)

    const result = await strapi.entityService.update(
      'api::activity.activity',
      id,
      {
        data: { image: referenceActivity.image?.id },
      },
    )

    return { data: result }
  },
}
