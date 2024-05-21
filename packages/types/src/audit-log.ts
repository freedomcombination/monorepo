import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type AuditLogAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'published'
  | 'unpublished'
  | 'approved'
  | 'rejected'

export type AuditLogBase = {
  uid: string
  text: string
  profile: Profile
  modelId: number
  action: AuditLogAction
}

export type AuditLog = StrapiBase & AuditLogBase
