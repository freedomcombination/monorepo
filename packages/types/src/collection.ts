import { Art } from './art'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'

export type CollectionBase = StrapiEntityBase & {
  content: string | null
  date: string
}

type CollectionRelation = {
  image?: UploadFile | null
  arts?: Array<Art>
  localizations?: Array<Collection>
}

type CollectionRelationInput = {
  image: File
  arts?: Array<number>
}

export type CollectionCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    CollectionBase,
    'approvalStatus'
  > &
    CollectionRelationInput
>

export type CollectionUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<CollectionBase, 'locale'> & CollectionRelationInput
  >
>

export type CollectionLocalizeInput = Omit<
  CollectionBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Collection = StrapiBase &
  CollectionBase &
  CollectionRelation &
  StrapiCreatorRelation
