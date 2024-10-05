import { Art } from './art'
import { Expand } from './common'
import { StrapiBase } from './strapi'

type CategoryBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
}

// TODO: ArtClubTemplate
type CategoryRelation = {
  arts?: Art[]
}

export type CategoryCreateInput = Expand<
  { publishedAt?: Date | string | null } & CategoryBase
>

export type Category = StrapiBase & CategoryBase & CategoryRelation
