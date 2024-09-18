import { StrapiLocale } from '@fc/types'
import { getTranslate, TranslateFunc } from '../../emails/utils/getTranslate'

type EmailReceiver = {
  email: string
  locale?: StrapiLocale
}

export const sendReactMail = async (
  receivers: EmailReceiver[],
  mailBody: (t: TranslateFunc) => Promise<{ subject: string; html: string }>,
) => {
  const fixedReceivers = receivers.map(receiver => {
    return {
      ...receiver,
      locale: receiver.locale ?? 'en',
    }
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('Wont send email in development mode. Emails:', fixedReceivers)

    return
  }

  const groupedReceivers = fixedReceivers.reduce(
    (acc, receiver) => {
      if (!acc[receiver.locale]) {
        acc[receiver.locale] = [] as string[]
      }
      acc[receiver.locale].push(receiver.email)
      return acc
    },
    {} as Record<StrapiLocale, string[]>,
  )

  for (const [locale, receivers] of Object.entries(groupedReceivers)) {
    const { t } = getTranslate(locale as StrapiLocale)
    const body = await mailBody(t)

    await strapi.plugins['email'].services.email.send({
      to: receivers,
      from: process.env.SMTP_USERNAME,
      subject: body.subject,
      html: body.html,
    })
  }
}

export const sendReactMailByRoles = async (
  roles: string[],
  mailBody: (t: TranslateFunc) => Promise<{ subject: string; html: string }>,
) => {
  const users = await strapi.entityService.findMany(
    'plugin::users-permissions.user',
    {
      filters: {
        role: {
          type: {
            $in: roles,
          },
        },
      },
    },
  )

  const receivers = users.map(user => {
    return {
      email: user.email,
      locale: undefined, // user.locale,// TODO this ll be undefined for now.
    } satisfies EmailReceiver
  })

  await sendReactMail(receivers, mailBody)
}
