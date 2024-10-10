import type { Collection } from '@fc/types'
import { StrapiLocale } from '@fc/types'

import { generateCommonFields, generateLocalizedStrapiResponse } from './common'
import { faker } from './faker'

export const generateCollection = (locale: StrapiLocale): Collection => {
  const {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    description,
    content,
    approvalStatus,
    date,
  } = generateCommonFields(locale)

  const name = faker[locale].company.name()
  const slug = faker[locale].helpers.slugify(name)

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    translates: [],
    slug,
    locale,
    title: name,
    description,
    content,
    approvalStatus,
    date,
  }
}

export const COLLECTION_MOCKS =
  generateLocalizedStrapiResponse<Collection>(generateCollection)
