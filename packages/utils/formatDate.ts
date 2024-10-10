import { format } from 'date-fns'
import { enUS, nl, tr } from 'date-fns/locale'
import { Locale } from 'date-fns/types'

import type { StrapiLocale } from '@fc/types'

const locales: { [key: string]: Locale } = { en: enUS, tr, nl }

export const formatDate: (
  date: string | number | Date,
  formatStr: string,
  locale?: StrapiLocale,
) => string = (date, formatStr, locale) => {
  const fnsLocal = locales[locale || 'en']

  return format(date ?? 0, formatStr, { locale: fnsLocal })
}

interface Duration {
  [key: string]: number
}

interface LangOptions {
  [key: string]: {
    [key: string]: string
  }
}

export const formatDateRelative = (
  date: string | number | Date,
  locale: StrapiLocale = 'en',
) => {
  const durations: Duration = {
    year: 31536000000,
    month: 2628000000,
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
  }

  const langOptions: LangOptions = {
    tr: {
      year: '%d yıl',
      month: '%d ay',
      week: '%d hafta',
      day: '%d gün',
      hour: '%d saat',
      minute: '%d dakika',
      second: '%d saniye',
      yesterday: 'dün',
      today: 'bugün',
      tomorrow: 'yarın',
      and: 've',
      ago: 'önce',
      later: 'sonra',
    },
    en: {
      year: '%d year',
      month: '%d month',
      week: '%d week',
      day: '%d day',
      hour: '%d hour',
      minute: '%d minute',
      second: '%d second',
      yesterday: 'yesterday',
      today: 'today',
      tomorrow: 'tomorrow',
      and: 'and',
      ago: 'ago',
      later: 'later',
    },
    nl: {
      year: '%d jaar',
      month: '%d maand',
      week: '%d week',
      day: '%d dag',
      hour: '%d uur',
      minute: '%d minuut',
      second: '%d seconde',
      yesterday: 'gisteren',
      today: 'vandaag',
      tomorrow: 'morgen',
      and: 'en',
      ago: 'geleden',
      later: 'later',
    },
  }

  const lang = langOptions[locale]
  const startDate = new Date(date)
  const finishDate = new Date()
  const diff = finishDate.getTime() - startDate.getTime()
  const absDiff = Math.abs(diff)

  if (absDiff < durations.minute) {
    return lang.today
  }

  const formatUnit = (value: number, unit: string) => {
    return lang[unit].replace('%d', value.toString())
  }

  const getTimeDifference = () => {
    for (const [unit, ms] of Object.entries(durations)) {
      if (absDiff > ms || unit === 'minute') {
        const value = Math.floor(absDiff / ms)

        return { value, unit }
      }
    }

    return { value: 0, unit: 'minute' }
  }

  const { value, unit } = getTimeDifference()

  const formattedTime = formatUnit(value, unit)

  return `${formattedTime} ${diff < 0 ? lang.later : lang.ago}`
}
