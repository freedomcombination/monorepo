import type { Art } from '@fc/types'
import { StrapiLocale } from '@fc/types'

import { generateCommonFields, generateStrapiResponse } from './common'
import { faker } from './faker'

export const generateArt = (locale: StrapiLocale): Art => {
  const {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    description_en,
    description_nl,
    description_tr,
    title_en,
    title_nl,
    title_tr,
    approvalStatus,
    slug,
  } = generateCommonFields(locale)

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    translates: [],
    approvalStatus,
    description_en,
    description_nl,
    description_tr,
    slug,
    title_en,
    title_nl,
    title_tr,
    likes: faker.en.number.int(),
    views: faker.en.number.int(),
  }
}

export const ART_MOCKS = generateStrapiResponse<Art>(generateArt)
