import { Art } from './art'
import { Expand } from './common'
import { Platform } from './platform'
import { StrapiBase } from './strapi'

export type TagBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
}

export type TagRelation = {
  arts?: Art[]
  platforms?: Platform[]
}

export type TagRelationInput = {
  platforms?: number[]
}

export type TagCreateInput = Expand<
  { publishedAt?: Date | string | null } & TagBase & TagRelationInput
>

export type TagUpdateInput = TagCreateInput

export type Tag = StrapiBase & TagBase & TagRelation
