import { SetRequired } from 'type-fest'

import { Art } from './art'
import { Blog } from './blog'
import { Expand } from './common'
import { Feedback } from './feedback'
import { UploadFile } from './file'
import { Job } from './job'
import { Observation } from './observation'
import { Platform } from './platform'
import { Permissions } from './role'
import { StrapiBase } from './strapi'
import { Subscriber } from './subscriber'
import { User } from './user'

export type ProfileStatus =
  | 'left'
  | 'pending'
  | 'rejected'
  | 'in-progress'
  | 'accepted'
  | 'awaiting'
  | 'approved'

export type ProfileBase = {
  email: string
  city: string | null
  birthDate: Date | string | null
  availableHours: number | null
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
  isVolunteer: boolean | null
  profileStatus?: ProfileStatus
}

type ProfileRelation = {
  address?: {
    city?: string | null
    country?: string | null
    address?: string | null
    postcode?: string | null
  }
  avatar?: UploadFile | null
  comments?: Array<Comment>
  cv?: UploadFile | null
  feedbacks?: Array<Feedback>
  jobs?: Array<Job>
  likedArts?: Array<Art>
  likedBlogs?: Array<Blog>
  observations?: Array<Observation>
  ownedArts?: Array<Art>
  ownedBlogs?: Array<Blog>
  permissions?: Permissions
  platforms?: Array<Platform>
  subscriber?: Subscriber | null
  user?: User | null
  volunteerForm?: UploadFile | null
}

type ProfileRelationInput = {
  address?: {
    city?: string
    country?: string
    address?: string
    postcode?: string
  }
  avatar?: File
  comments?: Array<number>
  jobs?: Array<number>
  platforms?: Array<number>
  user?: number
  recaptchaToken?: string
}

export type ProfileCreateInput = Expand<
  { publishedAt?: Date | string | null } & SetRequired<
    Partial<Omit<ProfileBase, 'approved'>>,
    'name' | 'email'
  > &
    ProfileRelationInput
>

export type ProfileUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<ProfileBase> &
    ProfileRelationInput
>

export type Profile = StrapiBase & ProfileBase & ProfileRelation
