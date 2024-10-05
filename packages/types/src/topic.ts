import { StrapiLocale } from './locale'
import { StrapiBase } from './strapi'

export type TopicBase = {
  id?: number
  url: string
  title?: string
  description?: string
  category?: string
  image?: string
  time?: string
  locale: StrapiLocale
  publisher: string
  isRecommended?: boolean
  type?: TopicBaseType
}

export type TopicBaseType = 'Blog' | 'Activity' | 'Topic'

export type Topic = StrapiBase & {
  data: TopicBase[]
}
