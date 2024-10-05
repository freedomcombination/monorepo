import { Art } from './art'
import { Blog } from './blog'
import { Expand, PickRequired } from './common'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type CommentBase = {
  content: string
  name?: string | null
  email?: string | null
  blocked?: boolean | null
}

type CommentRelation = {
  profile?: Profile | null
  blog?: Blog | null
  art?: Art | null
}

type CommentRelationInput = {
  // TODO: Remove profile on create. Relation should be associated with token
  profile?: number
  blog?: number
  art?: number
}

export type CommentCreateInputPublic<T extends 'art' | 'blog'> = Expand<
  PickRequired<CommentBase, 'content' | 'email' | 'name'> &
    PickRequired<CommentRelationInput, T> & { recaptchaToken: string }
>

export type CommentCreateInputUser<T extends 'art' | 'blog'> = Expand<
  Pick<CommentBase, 'content'> & PickRequired<CommentRelationInput, T>
>

export type CommentCreateInput<T extends 'art' | 'blog'> =
  | CommentCreateInputPublic<T>
  | CommentCreateInputUser<T>

export type Comment = StrapiBase & CommentBase & CommentRelation
