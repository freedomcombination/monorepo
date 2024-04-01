import { Application } from './application'
import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'

type CompetitionBase = StrapiEntityBase & {
  content: string | null
  date: string
  deadline: string
}

type CompetitionRelation = {
  image?: UploadFile | null
  applications?: Array<Application>
  categories?: Array<Category>
  localizations?: Array<Competition>
}

type CompetitionRelationInput = {
  image: File
  applications?: Array<number>
  categories?: Array<number>
}

export type CompetitionCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    CompetitionBase,
    'approvalStatus'
  > &
    Omit<CompetitionRelationInput, 'applications'>
>

export type CompetitionUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<CompetitionBase, 'locale'> & CompetitionRelationInput
  >
>

export type CompetitionLocalizeInput = Omit<
  CompetitionBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Competition = StrapiBase &
  CompetitionBase &
  CompetitionRelation &
  StrapiCreatorRelation
