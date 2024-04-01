import { Applicant } from './applicant'
import { Expand } from './common'
import { Competition } from './competition'
import { UploadFile } from './file'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tag } from './tag'
import { Vote } from './vote'

export type ApplicationBase = Omit<StrapiEntityBase, 'description'> & {
  content: string | null
}

type ApplicationRelation = {
  image?: UploadFile | null
  competition?: Competition | null
  applicant?: Applicant | null
  votes?: Array<Vote>
  tags?: Array<Tag>
  localizations?: Array<Application>
}

type ApplicationRelationInput = {
  image: File
  competition: number
  applicant: number
  votes?: Array<number>
  juryVotes?: Array<number>
  tags?: Array<number>
}

export type ApplicationCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    ApplicationBase,
    'approvalStatus'
  > &
    Omit<ApplicationRelationInput, 'votes' | 'juryVotes'>
>

export type ApplicationUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<ApplicationBase, 'locale'> & ApplicationRelationInput
  >
>

export type Application = StrapiBase &
  ApplicationBase &
  ApplicationRelation &
  StrapiCreatorRelation
