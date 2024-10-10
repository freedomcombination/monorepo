import { ArchiveImage } from './archive-image'
import { Category } from './category'
import { Expand } from './common'
import { Prison } from './prison'
import { StrapiBase } from './strapi'

type VictimBase = {
  slug: string
  name: string
  description_en: string | null
  description_nl: string | null
  description_tr: string | null
  incidentDate: Date | string | null
  resolvedDate: Date | string | null
  resolved: boolean
  deceased: boolean
  pregnant: boolean
  baby: boolean
  sick: boolean
  noshare: boolean
}

type VictimRelation = {
  categories?: Category[]
  images?: ArchiveImage[]
  prisons?: Prison[]
}

type VictimRelationInput = {
  categories?: number
  images?: number[]
  prisons?: number
}

export type VictimCreateInput = Expand<
  { publishedAt?: Date | string | null } & VictimBase & VictimRelationInput
>

export type VictimUpdateInput = VictimCreateInput

export type Victim = StrapiBase & VictimBase & VictimRelation
