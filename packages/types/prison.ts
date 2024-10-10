import { Expand } from './common'
import { StrapiBase } from './strapi'

type PrisonBase = {
  slug: string
  name: string
  city: string
}

export type PrisonCreateInput = Expand<
  { publishedAt?: Date | string | null } & PrisonBase
>

export type PrisonUpdateInput = PrisonCreateInput

export type Prison = StrapiBase & PrisonBase
