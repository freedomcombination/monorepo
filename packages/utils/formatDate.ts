import { format } from 'date-fns'
import type { Locale } from 'date-fns'
import { enUS, tr, nl } from 'date-fns/locale'

import type { StrapiLocale } from '@fc/types'

const locales: { [key: string]: Locale } = { en: enUS, tr, nl }

export const formatDate: (
  date: string | number | Date,
  formatStr: string,
  locale?: StrapiLocale,
) => string = (date, formatStr, locale) => {
  const fnsLocal = locales[locale || 'en']

  return format(date, formatStr, { locale: fnsLocal })
}
