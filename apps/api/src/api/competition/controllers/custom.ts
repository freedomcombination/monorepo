import { Context } from 'koa'

import { assignApprover, getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await assignApprover(
      ctx,
      'api::competition.competition',
      true,
    )

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentCompetition = await strapi.entityService.findOne(
      'api::competition.competition',
      id,
      {
        populate: ['localizations.image'],
      },
    )

    const referenceCompetition = getReferenceModel(currentCompetition)

    const result = await strapi.entityService.update(
      'api::competition.competition',
      id,
      {
        data: { image: referenceCompetition.image?.id },
      },
    )

    return { data: result }
  },
}
