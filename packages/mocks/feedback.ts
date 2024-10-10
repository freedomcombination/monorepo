import type { Feedback } from '@fc/types'
import { StrapiLocale } from '@fc/types'

import { generateCommonFields, generateStrapiResponse } from './common'
import { faker } from './faker'

export const generateFeedback = (locale: StrapiLocale): Feedback => {
  const { description, id, createdAt, updatedAt, publishedAt, approvalStatus } =
    generateCommonFields(locale)

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    translates: [],
    message: description,
    point: faker[locale].number.int({ min: 2, max: 5 }),
    status: approvalStatus,
  }
}

export const FEEDBACK_MOCKS = generateStrapiResponse<Feedback>(generateFeedback)
