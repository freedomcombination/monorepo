import type { Category } from '@fc/types'
import { StrapiLocale } from '@fc/types'

import { generateCommonFields, generateStrapiResponse } from './common'
import { faker } from './faker'

export const generateCategory = (locale: StrapiLocale): Category => {
  const { id, createdAt, updatedAt, publishedAt } = generateCommonFields(locale)

  const name = faker[locale].lorem.word()
  const slug = faker[locale].helpers.slugify(name)

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    translates: [],
    slug,
    name_en: name,
    name_nl: faker.nl.lorem.sentence(),
    name_tr: faker.tr.lorem.sentence(),
  }
}

export const CATEGORY_MOCKS = generateStrapiResponse<Category>(generateCategory)
