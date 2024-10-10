import { sample } from 'lodash'

import type { Hashtag } from '@fc/types'
import { StrapiLocale } from '@fc/types'

import { generateCommonFields, generateLocalizedStrapiResponse } from './common'
import { faker } from './faker'

export const generateHashtag = (locale: StrapiLocale): Hashtag => {
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
    hashtagDefault: faker[locale].company.name(),
    hashtagExtra: sample([null, null, null, faker[locale].company.name()]),
    tweets: [],
  }
}

export const HASHTAG_MOCKS =
  generateLocalizedStrapiResponse<Hashtag>(generateHashtag)
