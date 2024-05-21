import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type AuditLogBase = {
  uid: string
  text: string
  profile: Profile
  modelId: number
  action: 'create' | 'update' | 'delete' | 'publish' | 'approve'
}

export type AuditLog = StrapiBase & AuditLogBase
