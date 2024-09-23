import { Profile } from './profile'
import { StrapiBase } from './strapi'

type UserNotificationBase = {
  read: boolean
}

type UserNotificationRelation = {
  notification: Notification
  profile: Profile
}

type UserNotificationRelationInput = {
  notification: number
  profile: number
}

export type UserNotificationCreateInput = UserNotificationBase &
  UserNotificationRelationInput

export type UserNotificationUpdateInput = UserNotificationBase

export type UserNotification = StrapiBase &
  UserNotificationBase &
  UserNotificationRelation
