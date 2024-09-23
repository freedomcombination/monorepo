import { Application } from './application'
import { Art } from './art'
import { Expand, PickRequired } from './common'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type VoteBase = {
  value: number
}

type VoteRelation = {
  voter?: Profile | null
  jury?: Profile | null
  application?: Application | null
  art?: Art | null
}

type VoteRelationInput = {
  voter?: number
  jury?: number
  application?: number
  art?: number
}

export type VoteCreateApplicationInput = Expand<
  { publishedAt?: Date | string | null } & VoteBase &
    PickRequired<VoteRelationInput, 'voter' | 'application'>
>

export type VoteCreateArtInput = Expand<
  { publishedAt?: Date | string | null } & VoteBase &
    PickRequired<VoteRelationInput, 'voter' | 'art'>
>

export type VoteCreateApplicationJuryInput = Expand<
  { publishedAt?: Date | string | null } & VoteBase &
    PickRequired<VoteRelationInput, 'jury' | 'application'>
>

export type VoteCreateArtJuryInput = Expand<
  { publishedAt?: Date | string | null } & VoteBase &
    PickRequired<VoteRelationInput, 'jury' | 'art'>
>

export type Vote = StrapiBase & VoteBase & VoteRelation
