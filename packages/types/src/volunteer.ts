import { SetRequired } from 'type-fest'

import { Expand } from './common'
import { Job } from './job'
import { Platform } from './platform'
import { StrapiBase } from './strapi'
import { User } from './user'

export type VolunteerBase = {
  username: string
  email: string
  city: string
  age: number
  availableHours: number
  approved: boolean | null
  bio: string | null
  comment: string | null
  country: string | null
  facebook: string | null
  heardFrom: string | null
  inMailingList: boolean | null
  instagram: string | null
  isPublic: boolean | null
  linkedin: string | null
  name: string | null
  occupation: string | null
  phone: string | null
  twitter: string | null
}

type VolinteerRelation = {
  user?: User | null
  jobs?: Array<Job>
  platforms?: Array<Platform>
}

type VolinteerRelationInput = {
  user?: number
  jobs?: Array<number>
  platforms?: Array<number>
}

export type VolunteerCreateInput = Expand<
  { publishedAt?: Date | string | null } & SetRequired<
    Partial<Omit<VolunteerBase, 'approved'>>,
    'username' | 'name' | 'email' | 'phone' | 'availableHours'
  > &
    VolinteerRelationInput
>

export type VolunteerUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<VolunteerBase> &
    VolinteerRelationInput
>

export type Volunteer = StrapiBase & VolunteerBase & VolinteerRelation
