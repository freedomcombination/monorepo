import { resolve } from 'path'

import type { StrapiLocale } from '@fc/types'

export const i18nConfig = {
  i18n: {
    defaultLocale: 'en' as StrapiLocale,
    locales: ['en', 'nl', 'tr'] as StrapiLocale[],
  },
  localePath: resolve('public/locales'),
}
