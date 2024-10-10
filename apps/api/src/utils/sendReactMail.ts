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

  if (process.env.NODE_ENV === 'development') {
    const { t } = getTranslate('en')
    const body = await mailBody(t)

    console.log('Email begins: ', body.subject)
    console.log('Emails are sent with locales: ', groupedReceivers)
    console.log('Email ends: ', body.subject)

    return
  }

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
  const profiles = await strapi.entityService.findMany('api::profile.profile', {
    filters: {
      user: {
        role: {
          type: {
            $in: roles,
          },
        },
      },
    },
  })

  const receivers = profiles.map(profile => {
    return {
      email: profile.email,
      locale: profile.locale as StrapiLocale,
    } satisfies EmailReceiver
  })

  await sendReactMail(receivers, mailBody)
}
