import { StrapiBase } from './strapi'

export type DevMail = {
  to: string
  subject: string
  html: string
  groupDate: string
} & StrapiBase
