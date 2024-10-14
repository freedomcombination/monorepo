import type { Comment } from '@fc/types'
import { StrapiLocale } from '@fc/types'

import { generateCommonFields, generateStrapiResponse } from './common'
import { faker } from './faker'

export const generateComment = (locale: StrapiLocale): Comment => {
  const { name, description, id, createdAt, updatedAt, publishedAt } =
    generateCommonFields(locale)

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    translates: [],
    name,
    email: faker[locale].internet.email(),
    profile: null,
    content: description,
  }
}

export const COMMENT_MOCKS = generateStrapiResponse<Comment>(generateComment)
