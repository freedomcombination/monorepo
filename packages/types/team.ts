import { Foundation } from './foundation'
import { Platform } from './platform'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type TeamBase = StrapiBase & {
  name: string
  description: string
}

export type TeamRelation = {
  lead: Profile
  members: Profile[]
  foundation: Foundation
  platforms: Platform[]
}

export type Team = TeamBase & TeamRelation
