import { StrapiLocale } from '@fc/types'

export const minuteSuffix = {
  en: 'mins',
  nl: 'min',
  tr: 'dk',
}

export const getReadingTime = (text: string, locale: StrapiLocale) => {
  if (!text) return ''

  const wpm = 225
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)

  return `${time} ${minuteSuffix[locale]}`
}
