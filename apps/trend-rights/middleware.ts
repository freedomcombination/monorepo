import { get } from '@vercel/edge-config'
import { addHours, isWithinInterval } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const SLUG_COOKIE_KEY = 'hashtag-redirect-slug'
const EDGE_CONFIG_KEY =
  process.env.VERCEL_ENV === 'production' ? 'last-hashtag' : 'last-hashtag-dev'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (request.method === 'OPTIONS') {
      return NextResponse.json({}, { headers: corsHeaders })
    }
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.append(key, value)
    })

    return response
  }

  const lastHashtag = await get(EDGE_CONFIG_KEY)
  const [slug, dateStr] = ((lastHashtag as string) || '').split('__')
  const hashtagSlug = `/hashtags/${slug}`

  if (
    !slug ||
    !dateStr ||
    request.nextUrl.pathname.startsWith(hashtagSlug) || // already on the page
    request.cookies.get(SLUG_COOKIE_KEY)?.value === slug // already redirected
  ) {
    return response
  }

  const hashtagDatetimePlus12Hours = addHours(dateStr, 12)
  const currentDate = new Date()
  const isCurrentDateWithinInterval = isWithinInterval(currentDate, {
    start: dateStr,
    end: hashtagDatetimePlus12Hours,
  })

  if (isCurrentDateWithinInterval) {
    // FIXME: Redirecting and cookie setting didn't work for me
    response.cookies.set(SLUG_COOKIE_KEY, slug)

    return NextResponse.redirect(new URL(hashtagSlug, request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon|images|android-|apple-).*)',
  ],
}
