import { Art } from './art'
import { Expand } from './common'
import { Platform } from './platform'
import { StrapiBase } from './strapi'

type CategoryBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
}

type CategoryRelation = {
  arts?: Art[]
  platforms?: Platform[]
}

type CategoryRelationInput = {
  platforms?: number
}

export type CategoryCreateInput = Expand<
  { publishedAt?: Date | string | null } & CategoryBase & CategoryRelationInput
>

export type Category = StrapiBase & CategoryBase & CategoryRelation
