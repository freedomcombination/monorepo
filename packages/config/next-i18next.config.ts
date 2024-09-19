import { resolve } from 'path'

import { StrapiLocale } from '@fc/types'

export const i18nConfig = {
  i18n: {
    defaultLocale: 'en' as StrapiLocale,
    fallbackLocale: 'en' as StrapiLocale,
    locales: ['en', 'nl', 'tr'] as StrapiLocale[],
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
  localePath: resolve('public/locales'),
}
