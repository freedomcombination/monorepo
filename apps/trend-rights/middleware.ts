import { get } from '@vercel/edge-config'
import { addHours, isWithinInterval } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

import type { StrapiLocale } from '@fc/types'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const PUBLIC_FILE = /\.(.*)$/

const getSlugCookieKey = (locale: StrapiLocale) =>
  `${locale}-hashtag-redirect-slug`
const getEdgeConfigKey = (locale: StrapiLocale) =>
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
    ? `${locale}-last-hashtag`
    : `${locale}-last-hashtag-dev`

export async function middleware(request: NextRequest) {
  let response = NextResponse.next()
  const locale = request.nextUrl.locale as StrapiLocale
  const edgeConfigKey = getEdgeConfigKey(locale)
  const slugCookieKey = getSlugCookieKey(locale)

  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (request.method === 'OPTIONS') {
      return NextResponse.json({}, { headers: corsHeaders })
    }
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.append(key, value)
    })

    return response
  }

  const lastHashtag = await get(edgeConfigKey)
  const [slug, dateStr] = ((lastHashtag as string) || '').split('__')
  const hashtagSlug = `/hashtags/${slug}`
  const cookieSlug = request.cookies.get(slugCookieKey)?.value

  if (
    !slug ||
    !dateStr ||
    request.nextUrl.pathname.startsWith(hashtagSlug) || // already on the page
    cookieSlug === slug || // already redirected
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return
  }

  const hashtagDatetimePlus12Hours = addHours(dateStr, 12)
  const currentDate = new Date()
  const isCurrentDateWithinInterval = isWithinInterval(currentDate, {
    start: dateStr,
    end: hashtagDatetimePlus12Hours,
  })

  if (isCurrentDateWithinInterval) {
    response = NextResponse.redirect(new URL(hashtagSlug, request.url))
    response.cookies.set(slugCookieKey, slug)
  }

  return response
}
