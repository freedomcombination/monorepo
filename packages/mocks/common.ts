import { type Faker } from '@faker-js/faker'
import { faker as fakerEn } from '@faker-js/faker/locale/en'
import { faker as fakerNl } from '@faker-js/faker/locale/nl'
import { faker as fakerTr } from '@faker-js/faker/locale/tr'
import { sample } from 'lodash'

import {
  ApprovalStatus,
  Localize,
  StrapiCollectionResponse,
  StrapiLocale,
  StrapiModel,
} from '@fc/types'

const faker: Localize<Faker> = {
  en: fakerEn,
  nl: fakerNl,
  tr: fakerTr,
}

export const generateMeta = (total: number, size = 25) => ({
  pagination: {
    page: 1,
    pageSize: size,
    pageCount: Math.ceil(total / size),
    total,
  },
})

export const generateCommonFields = (locale: StrapiLocale) => {
  const name = faker[locale].lorem.sentence({ min: 1, max: 4 })
  const slug = faker[locale].helpers.slugify(name)

  return {
    id: faker.en.number.int(),
    createdAt: faker.en.date.recent().toISOString(),
    publishedAt: faker.en.date.recent().toISOString(),
    updatedAt: faker.en.date.recent().toISOString(),
    content: faker[locale].lorem.paragraphs({ min: 3, max: 10 }),
    content_en: faker.en.lorem.paragraphs({ min: 3, max: 10 }),
    content_nl: faker.nl.lorem.paragraphs({ min: 3, max: 10 }),
    content_tr: faker.tr.lorem.paragraphs({ min: 3, max: 10 }),
    description: faker[locale].lorem.paragraph(),
    description_en: faker.en.lorem.paragraph(),
    description_nl: faker.nl.lorem.paragraph(),
    description_tr: faker.tr.lorem.paragraph(),
    name,
    slug,
    title: name,
    title_en: name,
    title_nl: faker.nl.lorem.sentence(),
    title_tr: faker.tr.lorem.sentence(),
    approvalStatus: sample([
      'approved',
      'pending',
      'rejected',
    ]) as ApprovalStatus,
    likes: faker.en.number.int({ max: 100 }),
    views: faker.en.number.int({ max: 2000 }),
  }
}

export const generateStrapiResponse = <T extends StrapiModel>(
  fn: (locale: StrapiLocale) => T,
  locale: StrapiLocale = 'en',
  size = 25,
): StrapiCollectionResponse<T[]> => {
  const total = Math.floor(Math.random() * 12)
  const length = total % size ?? total

  return {
    data: Array.from({ length }, () => fn(locale) as T),
    meta: generateMeta(total, size),
  }
}

export const generateLocalizedStrapiResponse = <T extends StrapiModel>(
  fn: (locale: StrapiLocale) => T,
  size = 25,
): Localize<StrapiCollectionResponse<T[]>> => {
  return {
    tr: generateStrapiResponse(fn, 'tr', size),
    nl: generateStrapiResponse(fn, 'nl', size),
    en: generateStrapiResponse(fn, 'en', size),
  }
}
