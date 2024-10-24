import { StrapiLocale } from '@fc/types'
import { getTranslate, TranslateFunc } from '../../emails/utils/getTranslate'

type EmailReceiver = {
  email: string
  locale?: StrapiLocale
}

export type EmailDetails = {
  subject: string
  html: string
}

export const sendReactMail = async (
  receivers: EmailReceiver[],
  mailBody: (t: TranslateFunc) => Promise<EmailDetails>,
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

  const mailContents: { to: string[]; subject: string; html: string }[] = []

  for (const [locale, receivers] of Object.entries(groupedReceivers)) {
    const { t } = getTranslate(locale as StrapiLocale)
    const body = await mailBody(t)

    mailContents.push({
      to: receivers,
      subject: body.subject,
      html: body.html,
    })
  }

  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    const groupDate = new Date().toISOString()
    await strapi.db.query('api::dev-mail.dev-mail').createMany({
      data: mailContents.map(({ to, subject, html }) => ({
        to: to.join(', '),
        subject,
        html,
        groupDate,
      })),
    })

    return
  }

  mailContents.forEach(({ to, subject, html }) => {
    strapi.plugins['email'].services.email.send({
      to,
      from: process.env.SMTP_USERNAME,
      subject,
      html,
    })
  })
}

export const sendReactMailByRoles = async (
  roles: string[],
  mailBody: (t: TranslateFunc) => Promise<EmailDetails>,
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
