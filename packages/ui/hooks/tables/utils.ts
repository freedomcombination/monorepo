import { TFunction } from 'i18next'

import type { StrapiLocale } from '@fc/types'

export const renderJoinedLocales = (locales: StrapiLocale[]) => {
  return locales.map(locale => `[${locale}]`).join(', ')
}

export const renderPublicationState = (
  publishedAt: string | null,
  t: TFunction<'common', undefined>,
) => {
  return publishedAt ? t('published') : t('draft')
}
