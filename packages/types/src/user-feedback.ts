import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase } from './strapi'

export type UserFeedbackBase = {
  point: number
  image?: UploadFile | null
  comment: string
  site: string
  processed?: boolean
  issueLink?: string
}

export type UserFeedbackCreateInput = Expand<
  { publishedAt?: Date | string | null } & UserFeedbackBase
> & {
  recaptchaToken?: string
}

export type UserFeedbackUpdateInput = Pick<
  UserFeedbackBase,
  'processed' | 'issueLink'
>

export type UserFeedback = StrapiBase & UserFeedbackBase
