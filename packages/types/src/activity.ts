import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { Platform } from './platform'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tag } from './tag'

type ActivityBase = StrapiEntityBase & {
  content: string | null
  date: string
  place: string | null
}

type ActivityRelation = {
  categories?: Array<Category>
  tags?: Array<Tag>
  image?: UploadFile | null
  localizations?: Array<Activity>
  platforms?: Array<Platform>
}

type ActivityRelationInput = {
  categories?: number
  tags?: Array<number>
  image: File
  platforms?: number[]
}

export type ActivityCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    ActivityBase,
    'approvalStatus'
  > &
    ActivityRelationInput
>
export type ActivityUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<ActivityBase, 'locale'>
  > &
    Omit<ActivityRelationInput, 'image'> & { image?: File }
>
export type ActivityLocalizeInput = Pick<
  ActivityBase,
  'title' | 'description' | 'content'
>

export type Activity = StrapiBase &
  ActivityBase &
  ActivityRelation &
  StrapiCreatorRelation
