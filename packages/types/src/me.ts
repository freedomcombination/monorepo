import { StrapiBase } from './strapi'

export type Me = StrapiBase & {
  blocked: boolean
  confirmed: boolean
  email: string
  role: MeRole
  username: string
}

export type MeRole = StrapiBase & {
  description: string
  name: string
  type: string
}
