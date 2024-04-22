import { SetRequired } from 'type-fest'

import { PlatformSlug } from './app'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'

export type ApprovalStatus = 'approved' | 'pending' | 'rejected'
export type DonationStatus = 'canceled' | 'expired' | 'paid' | 'unpaid' | 'all'

export type Localize<T> = Record<StrapiLocale, T>

export type MenuType = {
  link?: string
  isExternal?: boolean
  children?: MenuType[]
} & Localize<string>

// Ref: https://stackoverflow.com/a/57683652/8206907
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type PickRequired<T, K extends keyof T> = SetRequired<Pick<T, K>, K>

export type Sort = [`${string | `${string}.${string}`}:${'asc' | 'desc'}`]

export type OgImageParams = Partial<{
  bg: string
  color: string
  flip: boolean
  hasLine: boolean
  image: string | UploadFile
  randomImage: boolean
  scale: number
  shape: number
  text: string
  title: string
  platform: PlatformSlug
}>
