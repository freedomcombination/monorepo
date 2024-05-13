import { Expand, PickRequired } from './common'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type ObservationBase = {
  content: string
  createdDate: string
}

type ObservationRelation = {
  profile?: Profile | null
  creator?: Profile | null
}

type ObservationRelationInput = {
  profile?: number
  creator?: number
}

export type ObservationCreateInput = Expand<
  Pick<ObservationBase, 'content'> &
    PickRequired<ObservationRelationInput, 'profile'>
>

export type Observation = StrapiBase & ObservationBase & ObservationRelation
