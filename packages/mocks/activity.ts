import type { Activity } from '@fc/types'
import { StrapiLocale } from '@fc/types'

import { generateCommonFields, generateLocalizedStrapiResponse } from './common'
import { faker } from './faker'

export const generateActivity = (locale: StrapiLocale): Activity => {
  const {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    title,
    slug,
    description,
    content,
    approvalStatus,
  } = generateCommonFields(locale)

  return {
    id,
    approvalStatus,
    content,
    createdAt,
    date: faker[locale].date.recent().toISOString(),
    description,
    locale,
    place: faker[locale].location.city(),
    publishedAt,
    slug,
    title,
    translates: [],
    updatedAt,
  }
}

export const ACTIVITY_MOCKS =
  generateLocalizedStrapiResponse<Activity>(generateActivity)
