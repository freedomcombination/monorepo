export const SITE_URL =
  process.env['NEXT_PUBLIC_SITE_URL'] || `https://${process.env['VERCEL_URL']}`

export const VERCEL_ENV = process.env['VERCEL_ENV']

const assetUrls: Record<string, string> = {
  development: 'https://wsvv-api-staging.onrender.com',
  production: 'https://api.freedomcombination.com',
  preview: 'https://wsvv-api-staging.onrender.com',
}

export const DONATION_REQUEST_LINK = process.env[
  'NEXT_PUBLIC_DONATION_REQUEST_LINK'
] as string
export const API_URL = process.env['NEXT_PUBLIC_API_URL'] as string
export const ASSETS_URL = assetUrls.production
export const ASSETS_FALLBACK_URL = VERCEL_ENV ? assetUrls[VERCEL_ENV] : API_URL
export const PUBLIC_TOKEN = process.env['NEXT_PUBLIC_TOKEN'] as string
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
