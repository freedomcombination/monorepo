import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { Prison } from './prison'
import { StrapiBase } from './strapi'
import { Victim } from './victim'

type ArchiveImageRelation = {
  categories?: Category[]
  image?: UploadFile
  victim?: Victim
  prison?: Prison
}

type ArchiveImageRelationInput = {
  categories: number[]
  image: File
  victim: number
  prison: number
}

export type ArchiveImageCreateInput = Expand<
  { publishedAt?: Date | string | null } & ArchiveImageRelationInput
>

export type ArchiveImageUpdateInput = ArchiveImageCreateInput

export type ArchiveImage = StrapiBase & ArchiveImageRelation
