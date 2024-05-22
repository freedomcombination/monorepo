import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type NotificationSubscription = {
  endpoint: string
  expirationTime: string | null
  keys: {
    auth: string
    p256dh: string
  }
}

export type SubscriberRelation = {
  subscription: NotificationSubscription | null
  profile?: Profile | null
}

export type SubscriberRelationInput = {
  subscription?: NotificationSubscription
}

export type SubscriberCreateInput = SubscriberRelationInput

export type SubscriberUpdateInput = SubscriberRelationInput

export type Subscriber = StrapiBase & SubscriberRelation
