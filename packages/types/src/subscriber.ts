import { PushSubscription } from 'web-push'

import { Site } from './app'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type WebPushSubscription = PushSubscription & {
  expirationTime: number
}

type SubscriberBase = {
  site: Site
}

export type SubscriberRelation = {
  subscription: WebPushSubscription | null
  profile?: Profile | null
}

export type SubscriberRelationInput = {
  subscription?: WebPushSubscription
}

export type SubscriberCreateInput = SubscriberBase & SubscriberRelationInput

export type SubscriberUpdateInput = SubscriberBase & SubscriberRelationInput

export type Subscriber = StrapiBase & SubscriberBase & SubscriberRelation
