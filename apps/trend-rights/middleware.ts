import { addHours, isWithinInterval, parseISO } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// this cookie ll hold last redirected slug's name
const cookieRedirectedSlug = '1redirected-slug'

// this cookie ll have a minute long life. if this cookie exists, it means that we already fetched data
const cookieDoFetch = '1do-fetch'

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

  if (request.cookies.has(cookieDoFetch)) {
    return NextResponse.next()
  }

  const lastHashtag = await get('last-hashtag')
  const [slug, dateStr] = ((lastHashtag as string) || '').split('__')

  if (!slug || !dateStr) {
    console.info('* No last hashtag found')

    return wait(NextResponse.next())
  }

  if (request.nextUrl.pathname.startsWith('/hashtags/' + slug)) {
    return wait(NextResponse.next())
  }

  const lastRedirectedSlug = request.cookies.get(cookieRedirectedSlug)

  if (lastRedirectedSlug?.value === slug) {
    return wait(NextResponse.next())
  }

  const hashtagDatetime = parseISO(dateStr)
  const hashtagDatetimePlus12Hours = addHours(hashtagDatetime, 12)

  const currentDate = new Date()
  const isCurrentDateWithinInterval = isWithinInterval(currentDate, {
    start: hashtagDatetime,
    end: hashtagDatetimePlus12Hours,
  })

  const response = isCurrentDateWithinInterval
    ? NextResponse.redirect(new URL('/hashtags/' + slug, request.url))
    : NextResponse.next()

  if (isCurrentDateWithinInterval) {
    response.cookies.set({
      name: cookieRedirectedSlug,
      value: slug,
      maxAge: 12 * 60 * 60,
    })
  }

  return wait(response)
}

function wait(response: NextResponse) {
  response.cookies.set({
    name: cookieDoFetch,
    value: '1',
    maxAge: 10,
  })

  return response
}

async function get(key: string) {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const url = process.env.EDGE_CONNECTION_STRING || ''

  try {
    const response = await fetch(url)
    if (response.ok) {
      const edgeConfig = await response.json()

      return edgeConfig.items[key]
    } else {
      throw new Error(`HTTP Error: ${response.status}`)
    }
  } catch (error) {
    console.error('Edge Config fetch failed:', error, url)
  }

  return null
}
