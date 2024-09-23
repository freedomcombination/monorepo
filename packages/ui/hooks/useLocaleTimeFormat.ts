import * as dateFns from 'date-fns'
import { enIN as en, nl, tr } from 'date-fns/locale'
import { useRouter } from 'next/router'

import type { StrapiLocale } from '@fc/types'

export const timeLocale = { en, nl, tr }

export const localeTimeFormat = (
  time: string,
  format: string,
  locale: StrapiLocale,
) => {
  if (!time || typeof window === 'undefined') return {}

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const date = new Date(
    (typeof time === 'string' ? new Date(time) : time).toLocaleString('en-US', {
      timeZone,
    }),
  )

  const differenceInHours = dateFns.differenceInHours(date, new Date())

  const formattedDateDistance = dateFns.formatDistanceToNowStrict(
    new Date(date),
    {
      locale: timeLocale[locale],
      unit: differenceInHours > 1 ? 'hour' : 'minute',
    },
  )

  const formattedDate = dateFns.format(date, format || 'dd MMMM yyyy', {
    locale: timeLocale[locale],
  })

  return { formattedDate, formattedDateDistance, date, timeZone }
}

export const useLocaleTimeFormat = (time: string, format: string) => {
  const { locale } = useRouter()

  return localeTimeFormat(time, format, locale)
}
