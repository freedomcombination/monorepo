import { get } from '@vercel/edge-config'
import { addHours, isWithinInterval, parseISO } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const SLUG_COOKIE_KEY = 'hashtag-redirect-slug'
const EDGE_CONFIG_KEY =
  process.env.NODE_ENV === 'production' ? 'last-hashtag' : 'last-hashtag-dev'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (request.method === 'OPTIONS') {
      return NextResponse.json({}, { headers: corsHeaders })
    }
    const response = NextResponse.next()
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.append(key, value)
    })

    return response
  }

  const lastHashtag = await get(EDGE_CONFIG_KEY)
  const [slug, dateStr] = ((lastHashtag as string) || '').split('__')

  if (
    !slug ||
    !dateStr ||
    request.nextUrl.pathname.startsWith('/hashtags/' + slug) || // already on the page
    request.cookies.get(SLUG_COOKIE_KEY)?.value === slug // already redirected
  ) {
    return NextResponse.next()
  }

  const hashtagDatetime = parseISO(dateStr)
  const hashtagDatetimePlus12Hours = addHours(hashtagDatetime, 12)
  const currentDate = new Date()
  const isCurrentDateWithinInterval = isWithinInterval(currentDate, {
    start: hashtagDatetime,
    end: hashtagDatetimePlus12Hours,
  })

  if (isCurrentDateWithinInterval) {
    return NextResponse.redirect(
      new URL('/hashtags/' + slug, request.url),
    ).cookies.set({
      name: SLUG_COOKIE_KEY,
      value: slug,
      maxAge: 12 * 60 * 60,
    })
  }

  return NextResponse.next()
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
