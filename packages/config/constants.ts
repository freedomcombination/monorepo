export const SITE_URL =
  process.env['NEXT_PUBLIC_SITE_URL'] || `https://${process.env['VERCEL_URL']}`

export const NEXT_PUBLIC_ENVIRONMENT = process.env['NEXT_PUBLIC_ENVIRONMENT']

const assetUrls: Record<string, string> = {
  development: 'https://wsvv-api-staging.onrender.com',
  production: 'https://api.freedomcombination.com',
  preview: 'https://wsvv-api-staging.onrender.com',
}

export const DONATION_REQUEST_LINK = process.env[
  'NEXT_PUBLIC_DONATION_REQUEST_LINK'
] as string
export const ALLOW_COURSE_PAYMENT =
  process.env.NODE_ENV !== 'production' || process.env.ALLOW_COURSE_PAYMENT
export const API_URL = process.env['NEXT_PUBLIC_API_URL'] as string
export const ASSETS_URL = assetUrls.production
export const ASSETS_FALLBACK_URL = NEXT_PUBLIC_ENVIRONMENT
  ? assetUrls[NEXT_PUBLIC_ENVIRONMENT]
  : API_URL
export const EMAIL = process.env['NEXT_PUBLIC_EMAIL'] as string
export const GA_MEASUREMENT_ID = process.env[
  'NEXT_PUBLIC_GA_MEASUREMENT_ID'
] as string
export const RECAPTCHA_SITE_KEY = process.env[
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
] as string
export const IS_PROD = process.env['NODE_ENV'] === 'production'
export const TWITTER_HANDLE =
  (process.env['NEXT_PUBLIC_TWITTER_HANDLE'] as string) || '@fc'
export const WEB_PUSH_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY ||
  'BClIUiDtfSidBBernuPDq_7ksHFgW54WVY6h5lNBlgomXB1B2mNSosiW8bGDZkugvP-bZMRFg1ULFHnre1WGGSg'

export enum RecaptchaKeys {
  COMMENT = 'comment',
  CONTACT_FORM = 'contact_form',
  FEEDBACk = 'feedback',
  JOIN_FORM = 'join_form',
  LIKE_ART = 'like_art',
  LIKE_BLOG = 'like_blog',
  VIEW_ART = 'view_art',
  VIEW_BLOG = 'view_blog',
}

export enum BLOG_CATEGORIES {
  DEFAULT = 'our-story',
  DOCUMENTARIES = 'documentaries',
  GLOBAL_ACTIVITIES = 'global-activities',
  BOOKS = 'books',
}
