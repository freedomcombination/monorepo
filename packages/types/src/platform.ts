import { Activity } from './activity'
import { Expand } from './common'
import { Contact } from './contact'
import { Course } from './course'
import { UploadFile } from './file'
import { Foundation } from './foundation'
import { Job } from './job'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type PlatformBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string
  description_nl: string
  description_tr: string
  content_en: string
  content_nl: string
  content_tr: string
  link: string | null
  contact?: Contact | null
}

type PlatformRelation = {
  image?: UploadFile | null
  jobs?: Array<Job>
  volunteers?: Array<Profile>
  courses?: Array<Course>
  activities?: Array<Activity>
  foundation?: Foundation | null
}

type PlatformRelationInput = {
  volunteers?: Array<number>
}

export type PlatformUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<PlatformBase> &
    PlatformRelationInput
>

export type Platform = StrapiBase & PlatformBase & PlatformRelation
