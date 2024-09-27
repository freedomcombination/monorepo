import { Expand } from './common'
import { StrapiBase } from './strapi'

export type NotificationBase = {
  title: string
  message: string
}

export type NotificationCreateInput = Expand<
  { publishedAt?: Date | string | null } & NotificationBase
>

export type Notification = StrapiBase & NotificationBase
