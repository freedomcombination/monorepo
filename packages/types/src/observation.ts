import { Expand } from './common'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type ObservationBase = {
  content: string
}

type ObservationRelation = {
  profile: Profile
  creator: Profile
}

type ObservationRelationInput = {
  profile: number
  creator: number
}

export type ObservationCreateInput = Expand<
  Pick<ObservationBase, 'content'> & ObservationRelationInput
>

export type Observation = StrapiBase & ObservationBase & ObservationRelation
