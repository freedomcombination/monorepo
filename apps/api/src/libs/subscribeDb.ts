/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProfile } from '../utils'

export const subscribeDb = async () => {
  type ContentTypeUID = Parameters<typeof strapi.entityService.findOne>[0]
  const allowedApis: ContentTypeUID[] = [
    'plugin::users-permissions.role',
    'api::account-statistic.account-statistic',
    'api::activity.activity',
    'api::applicant.applicant',
    'api::application.application',
    'api::archive-content.archive-content',
    'api::archive-image.archive-image',
    'api::art.art',
    'api::asset.asset',
    'api::assets-tracking.assets-tracking',
    'api::blog.blog',
    'api::category.category',
    'api::collection.collection',
    'api::comment.comment',
    'api::competition.competition',
    'api::course.course',
    'api::course-application.course-application',
    'api::donate.donate',
    'api::feedback.feedback',
    'api::foundation.foundation',
    'api::hashtag.hashtag',
    'api::job.job',
    'api::mention.mention',
    'api::observation.observation',
    'api::platform.platform',
    'api::post.post',
    'api::presentation.presentation',
    'api::profile.profile',
    'api::recommended-topic.recommended-topic',
    'api::recommended-tweet.recommended-tweet',
    'api::tag.tag',
    'api::trend.trend',
    'api::user-feedback.user-feedback',
    'api::vote.vote',
  ]

  strapi.db.lifecycles.subscribe(async e => {
    const event = e as any
    const result = event.result
    const uid = event.model?.uid
    const id = event.result?.id
    const ctx = await strapi.requestContext.get()
    const profile = ctx && (await getProfile(ctx, false))

    if (!allowedApis.includes(uid)) {
      return
    }

    if (event.action === 'afterCreate') {
      strapi.entityService.create('api::audit-log.audit-log', {
        data: {
          uid,
          text:
            result?.title ||
            result?.name ||
            result?.title_en ||
            result?.title_tr ||
            result?.title_nl ||
            result?.name_en ||
            result?.name_tr ||
            result?.name_nl ||
            result?.username,
          profile: profile?.id,
          modelId: id,
        },
      })
    }
  })
}
