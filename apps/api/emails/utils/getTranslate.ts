import type { StrapiLocale } from '@fc/types'
import { translations } from './translations'

export type TranslateFunc = (
  key?: keyof typeof translations,
  data?: Record<string, string>,
) => string

export const getTranslate = (lc: StrapiLocale) => {
  const locale = ['en', 'nl', 'tr'].includes(lc) ? lc : 'en'

  const t: TranslateFunc = (
    key?: keyof typeof translations,
    data?: Record<string, string>,
  ) => {
    if (!key) return locale
    const translationNode = translations[key]
    if (!translationNode) return key
    const translation = translationNode[locale]
    if (!translation) return key

    if (!data) return translation

    return Object.entries(data).reduce((acc, [key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')

      return acc.replace(regex, value)
    }, translation)
  }

  return { t }
}
