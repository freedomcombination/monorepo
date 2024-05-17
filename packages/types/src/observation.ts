import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type ObservationBase = {
  content: string
}

type ObservationRelation = {
  profile: Profile
  creator: Profile
}

export type ObservationCreateInput = Pick<ObservationBase, 'content'>

export type ObservationUpdateInput = ObservationCreateInput

export type Observation = StrapiBase & ObservationBase & ObservationRelation
