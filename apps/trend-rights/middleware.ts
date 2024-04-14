import { get } from '@vercel/edge-config'
import { addHours, isWithinInterval, parseISO } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const dontRedirectIfDevelopment = true // prevents redirecting if in development

export async function middleware(request: NextRequest) {
  if (request.url.startsWith('/api/')) {
    if (request.method === 'OPTIONS') {
      return NextResponse.json({}, { headers: corsHeaders })
    }
    const response = NextResponse.next()
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.append(key, value)
    })

    return response
  }

  if (
    (process.env.NODE_ENV !== 'production' && dontRedirectIfDevelopment) ||
    request.url.startsWith('/hashtag')
  )
    return

  const lastHashtag = await get('last-hashtag')
  const [slug, dateStr] = ((lastHashtag as string) || '').split('__')

  if (!slug || !dateStr) return

  const hashtagDatetime = parseISO(dateStr)
  const hashtagDatetimePlus12Hours = addHours(hashtagDatetime, 12)

  const currentDate = new Date()
  const isCurrentDateWithinInterval = isWithinInterval(currentDate, {
    start: hashtagDatetime,
    end: hashtagDatetimePlus12Hours,
  })

  if (isCurrentDateWithinInterval) {
    return NextResponse.redirect('/hashtags/' + slug)
  }
}
