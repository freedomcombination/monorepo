import { Category } from './category'
import { Expand } from './common'
import { StrapiLocale } from './locale'
import { Prison } from './prison'
import { StrapiBase } from './strapi'
import { Victim } from './victim'

export type ArchiveContentBase = {
  title: string
  date: string
  source: string
  link: string
  content: string
  locale: StrapiLocale
}

type ArchiveContentRelation = {
  categories?: Category[]
  victims?: Victim[]
  prisons?: Prison[]
}

type ArchiveContentRelationInput = {
  categories: number[]
  tags: number[]
  victims: number[]
  prisons: number[]
}

export type ArchiveContentCreateInput = Expand<
  { publishedAt?: Date | string | null } & ArchiveContentBase &
    ArchiveContentRelationInput
>

export type ArchiveContentUpdateInput = ArchiveContentCreateInput

export type ArchiveContent = StrapiBase &
  ArchiveContentBase &
  ArchiveContentRelation
