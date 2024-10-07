import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { Prison } from './prison'
import { StrapiBase } from './strapi'

type VictimBase = {
  slug: string
  name: string
  description: string
  incidentDate: Date | string
  resolvedDate: Date | string
  resolved: boolean
  deceased: boolean
  pregnant: boolean
  baby: boolean
  noshare: boolean
  sick: boolean
}

type VictimRelation = {
  categories?: Category[]
  images?: UploadFile[]
  prisons?: Prison[]
}

type VictimRelationInput = {
  categories?: number
  images?: File[]
  prisons?: number
}

export type VictimCreateInput = Expand<
  { publishedAt?: Date | string | null } & VictimBase & VictimRelationInput
>

export type VictimUpdateInput = VictimCreateInput

export type Victim = StrapiBase & VictimBase & VictimRelation
