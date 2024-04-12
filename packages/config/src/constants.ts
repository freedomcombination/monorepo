export const SITE_URL =
  process.env['NEXT_PUBLIC_SITE_URL'] || `https://${process.env['VERCEL_URL']}`

export const VERCEL_ENV = process.env['VERCEL_ENV'] as string

export const DONATION_REQUEST_LINK = process.env[
  'NEXT_PUBLIC_DONATION_REQUEST_LINK'
] as string
export const API_URL = process.env['NEXT_PUBLIC_API_URL'] as string
export const PUBLIC_TOKEN = process.env['NEXT_PUBLIC_TOKEN'] as string
export const EMAIL_RECEIVER = process.env[
  'NEXT_PUBLIC_EMAIL_RECEIVER'
] as string
export const EMAIL_SENDER = process.env['NEXT_PUBLIC_EMAIL_SENDER'] as string
export const GA_MEASUREMENT_ID = process.env[
  'NEXT_PUBLIC_GA_MEASUREMENT_ID'
] as string
export const RECAPTCHA_SITE_KEY = process.env[
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
] as string
export const IS_PROD = process.env['NODE_ENV'] === 'production'
export const TWITTER_HANDLE =
  (process.env['NEXT_PUBLIC_TWITTER_HANDLE'] as string) || '@fc'
