import { Expand } from './common'
import { Role } from './role'
import { StrapiBase } from './strapi'

export type UserBase = {
  email: string
  username: string
  blocked: boolean
  confirmed: boolean
  provider: string
}

type UserRelation = {
  role?: Role | null
}

type UserRelationInput = {
  role?: number
}

export type UpdateUserInput = Expand<
  Partial<Omit<UserBase, 'provider'> & UserRelationInput>
>

export type User = Omit<StrapiBase, 'publishedAt'> & UserBase & UserRelation
