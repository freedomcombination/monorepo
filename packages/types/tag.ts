import { Expand } from './common'
import { StrapiBase } from './strapi'

export type TagBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
}

export type TagCreateInput = Expand<
  { publishedAt?: Date | string | null } & TagBase
>

export type Tag = StrapiBase & TagBase
