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

  const allowedActions = ['afterCreate', 'beforeUpdate', 'afterDelete']

  strapi.db.lifecycles.subscribe(async e => {
    const event = e as any

    if (!allowedActions.includes(event.action)) {
      return
    }
    const uid = event.model?.uid

    if (!uid || !allowedApis.includes(uid)) {
      return
    }

    const result = event.result // this is exist only afterEvents
    const data = event.params?.data // these data are the ones that ll be updated
    const id = event.result?.id ?? event.params?.where?.id
    const ctx = await strapi.requestContext.get()
    const profile = ctx && (await getProfile(ctx, false))

    let action: any = 'deleted'

    if (event.action === 'afterCreate') {
      action = 'created'
    } else if (event.action === 'beforeUpdate') {
      action =
        data.approvalStatus === 'approved'
          ? 'approved'
          : data.approvalStatus === 'rejected'
            ? 'rejected'
            : data.publishedAt
              ? 'published'
              : 'updated'
    } else if (event.action === 'afterDelete') {
      action = 'deleted'
    }

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
        action,
        modelId: id,
      },
    })
  })
}
