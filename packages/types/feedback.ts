import { Art } from './art'
import { ApprovalStatus, Expand, PickRequired } from './common'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

type FeedbackBase = {
  message: string
  point: number
  status: ApprovalStatus
}

type FeedbackRelation = {
  art?: Art | null
  editor?: Profile | null
}

type FeedbackRelationInput = {
  art?: number
  editor?: number
}

export type FeedbackArtCreateInput = Expand<
  { publishedAt?: Date | string | null } & FeedbackBase &
    PickRequired<FeedbackRelationInput, 'art'>
>

export type FeedbackApplicationCreateInput = Expand<
  { publishedAt?: Date | string | null } & FeedbackBase &
    PickRequired<FeedbackRelationInput, 'editor'> & {
      token: string
    }
>

export type Feedback = StrapiBase & FeedbackBase & FeedbackRelation
