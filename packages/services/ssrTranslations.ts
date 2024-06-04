import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@fc/config'
import type { StrapiLocale } from '@fc/types'

export const ssrTranslations = async (locale: StrapiLocale) =>
  serverSideTranslations(locale, ['common'], i18nConfig)
