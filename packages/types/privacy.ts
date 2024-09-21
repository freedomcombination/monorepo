import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'

export type PrivacyBase = Omit<
  StrapiEntityBase,
  'description' | 'approvalStatus'
> & {
  content: string | null
}

type PrivacyRelation = {
  image?: UploadFile | null
  localizations?: Array<Privacy>
}

export type Privacy = StrapiBase & PrivacyBase & PrivacyRelation
