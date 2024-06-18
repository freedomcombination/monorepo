import webPush, { PushSubscription } from 'web-push'
import { errors } from '@strapi/utils'
import { checkAdmin } from '../../../utils'

export default {
  async notify(ctx) {
    const isAdmin = checkAdmin(ctx)

    if (
      !process.env.WEB_PUSH_EMAIL ||
      !process.env.WEB_PUSH_PUBLIC_KEY ||
      !process.env.WEB_PUSH_PRIVATE_KEY
    ) {
      throw new errors.ValidationError(
        'Web push credentials are not set up properly',
      )
    }

    if (!isAdmin) {
      throw new errors.ForbiddenError(
        'You are not authorized to perform this action',
      )
    }

    const roleIds = ctx.request.body?.roleIds as number[]
    const profileIds = ctx.request.body?.profileIds as number[]
    const payload = ctx.request.body?.payload

    const filters = {
      ...(roleIds?.length > 0 && {
        profile: {
          user: {
            role: {
              id: { $in: roleIds },
            },
          },
        },
      }),
      ...(profileIds?.length > 0 && {
        id: { $in: profileIds },
      }),
    }

    const subscribers = await strapi.entityService.findMany(
      'api::subscriber.subscriber',
      // TODO: Check limit
      { filters },
    )

    webPush.setVapidDetails(
      `mailto:${process.env.WEB_PUSH_EMAIL}`,
      process.env.WEB_PUSH_PUBLIC_KEY,
      process.env.WEB_PUSH_PRIVATE_KEY,
    )

    try {
      const results = await Promise.allSettled(
        subscribers.map(async subscriber => {
          return await webPush.sendNotification(
            subscriber.subscription as unknown as PushSubscription,
            JSON.stringify(payload),
          )
        }),
      )

      // Check if all promises are fulfilled
      const hasFailed = results.some(result => result.status === 'rejected')

      if (hasFailed) {
        // const fails = results.filter(result => result.status === 'rejected')
        // console.error('Failed to send some notifications: ', fails)
        // TODO: Send errors to Sentry
      }

      return results
    } catch (err) {
      console.error('Failed to send notifications: ', err)
      throw err
    }
  },
}
