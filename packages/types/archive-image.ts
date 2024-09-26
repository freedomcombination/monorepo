import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase } from './strapi'
import { Tag } from './tag'

type ArchiveImageRelation = {
  categories?: Category[]
  tags?: Tag[]
  image?: UploadFile
}

type ArchiveImageRelationInput = {
  categories: number[]
  tags: number[]
  image: File
}

export type ArchiveImageCreateInput = Expand<
  { publishedAt?: Date | string | null } & ArchiveImageRelationInput
>

export type ArchiveImageUpdateInput = ArchiveImageCreateInput

export type ArchiveImage = StrapiBase & ArchiveImageRelation
