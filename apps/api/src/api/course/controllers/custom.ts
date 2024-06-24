import { Context } from 'koa'
import { getReferenceModel } from '../../../utils'

export default {
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentCourse = await strapi.entityService.findOne(
      'api::course.course',
      id,
      {
        populate: ['localizations.image'],
      },
    )

    const referenceCourse = getReferenceModel(currentCourse)

    const result = await strapi.entityService.update('api::course.course', id, {
      data: { image: referenceCourse.image?.id },
    })

    return { data: result }
  },
}
