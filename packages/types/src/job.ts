import { Expand } from './common'
import { Platform } from './platform'
import { StrapiBase } from './strapi'

export type JobBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string | null
  description_nl: string | null
  description_tr: string | null
  responsibilities_tr: string | null
  responsibilities_nl: string | null
  responsibilities_en: string | null
  requirements_tr: string | null
  requirements_nl: string | null
  requirements_en: string | null
}

type JobRelation = {
  platform?: Platform | null
}

type JobRelationInput = {
  platform: number
}

export type JobCreateInput = Expand<
  { publishedAt?: Date | string | null } & JobBase & JobRelationInput
>

export type Job = StrapiBase & JobBase & JobRelation
