import { Category } from './category'
import { Expand } from './common'
import { StrapiLocale } from './locale'
import { StrapiBase } from './strapi'
import { Tag } from './tag'

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
  tags?: Tag[]
}

type ArchiveContentRelationInput = {
  categories: number[]
  tags: number[]
}

export type ArchiveContentCreateInput = Expand<
  { publishedAt?: Date | string | null } & ArchiveContentBase &
    ArchiveContentRelationInput
>

export type ArchiveContentUpdateInput = ArchiveContentCreateInput

export type ArchiveContent = StrapiBase &
  ArchiveContentBase &
  ArchiveContentRelation
