import { StrapiLocale } from '@fc/types'

import { translations } from './translations'

export const getTranslate = (lc: StrapiLocale) => {
  const locale = ['en', 'nl', 'tr'].includes(lc) ? lc : 'en'

  const t = (key: keyof typeof translations, data?: Record<string, string>) => {
    const translation = translations[key][locale]

    if (!translation) {
      return key
    }

    if (!data) return translation

    return Object.entries(data).reduce((acc, [key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')

      return acc.replace(regex, value)
    }, translation)
  }

  return { t }
}
