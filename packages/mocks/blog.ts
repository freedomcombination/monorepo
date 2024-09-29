import type { Blog } from '@fc/types'
import { StrapiLocale } from '@fc/types'

import { generateCategory } from './category'
import { generateCommonFields, generateLocalizedStrapiResponse } from './common'

export const generateBlog = (locale: StrapiLocale): Blog => {
  const {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    approvalStatus,
    description,
    content,
    title,
    slug,
    likes,
    views,
  } = generateCommonFields(locale)

  return {
    id,
    createdAt,
    updatedAt,
    publishedAt,
    translates: [],
    approvalStatus,
    description,
    content,
    slug,
    title,
    locale,
    categories: Array.from({ length: 3 }, () => generateCategory(locale)),
    likes,
    views,
  }
}

export const BLOG_MOCKS = generateLocalizedStrapiResponse<Blog>(generateBlog)
