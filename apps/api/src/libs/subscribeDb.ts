/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AuditLogAction } from '@fc/types'
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

  type StrapiLifecycleAction =
    | 'beforeCreate'
    | 'beforeCreateMany'
    | 'afterCreate'
    | 'afterCreateMany'
    | 'beforeUpdate'
    | 'beforeUpdateMany'
    | 'afterUpdate'
    | 'afterUpdateMany'
    | 'beforeDelete'
    | 'beforeDeleteMany'
    | 'afterDelete'
    | 'afterDeleteMany'
    | 'beforeCount'
    | 'afterCount'
    | 'beforeFindOne'
    | 'afterFindOne'
    | 'beforeFindMany'
    | 'afterFindMany'

  const allowedActions: StrapiLifecycleAction[] = [
    'afterCreate',
    'beforeUpdate',
    'afterDelete',
  ]

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
    // Only consider API users,
    // otherwise Strapi admin user ids will conflict with the user ids
    // It can cause irrelevant profile relations
    const profile = ctx?.state?.user?.confirmed && (await getProfile())

    let action: AuditLogAction
    const eventAction = event.action as StrapiLifecycleAction

    switch (eventAction) {
      case 'afterCreate':
        action = 'created'
        break
      case 'beforeUpdate':
        if (data.approvalStatus === 'approved') {
          action = 'approved'
        } else if (data.approvalStatus === 'rejected') {
          action = 'rejected'
        } else if (data.publishedAt) {
          action = 'published'
        } else if (data.publishedAt === null) {
          action = 'unpublished'
        } else {
          action = 'updated'
        }
        break
      case 'afterDelete':
        action = 'deleted'
        break
    }

    let text =
      result?.title ||
      result?.title_en ||
      result?.title_tr ||
      result?.title_nl ||
      result?.name ||
      result?.name_en ||
      result?.name_tr ||
      result?.name_nl ||
      result?.username ||
      result?.description ||
      result?.description_en ||
      result?.description_tr ||
      result?.description_nl ||
      result?.content ||
      result?.content_en ||
      result?.content_tr ||
      result?.content_nl ||
      result?.message ||
      result?.fromLocation ||
      result?.toLocation ||
      result?.notes ||
      result?.date ||
      data?.title ||
      data?.title_en ||
      data?.title_tr ||
      data?.title_nl ||
      data?.name ||
      data?.name_en ||
      data?.name_tr ||
      data?.name_nl ||
      data?.username ||
      data?.description ||
      data?.description_en ||
      data?.description_tr ||
      data?.description_nl ||
      data?.content ||
      data?.content_en ||
      data?.content_tr ||
      data?.content_nl ||
      data?.approvalStatus ||
      data?.fromLocation ||
      data?.toLocation ||
      data?.notes ||
      data?.date ||
      (data?.publishedAt !== undefined && data?.publishedAt && 'published')

    /**
     * After approving, publishing etc it triggers extra update events twice with the following data
     * {
     *  "date": "2023-12-16T06:00:00.000Z",
     * "updatedAt": "2024-05-26T12:03:25.751Z"
     * }
     * It's maybe because of Strapi updates the i18n relations.
     * In this case, we don't want to create an audit log for this event.
     */
    if (!text && data?.date) {
      return
    }

    const locale = data?.locale || result?.locale

    if (locale) {
      text = `${text} (${locale})`
    }

    if (typeof text !== 'string') {
      text = null
    } else {
      text = text.slice(0, 255)
    }

    strapi.entityService.create('api::audit-log.audit-log', {
      data: {
        uid,
        text,
        profile: profile?.id,
        action,
        modelId: id,
      },
    })
  })
}
