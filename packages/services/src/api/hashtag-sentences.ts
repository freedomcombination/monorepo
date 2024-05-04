import { kv } from '@vercel/kv'
import { NextRequest } from 'next/server'

const handleError = (error: any) => {
  return new Response(JSON.stringify({ error: error.message }), {
    status: error.status || 500,
  })
}

export const hashtagSentencesRouter = {
  async GET(req: NextRequest) {
    try {
      const hashtagId = req.nextUrl.searchParams.get('hashtagId')?.toString()

      const response = await kv.lrange(`hashtag:${hashtagId}`, 0, -1)

      return new Response(JSON.stringify(response))
    } catch (error: any) {
      return handleError(error)
    }
  },
  async POST(req: NextRequest) {
    try {
      const { hashtagId, value } = await req.json()

      const response = await kv.rpush(
        `hashtag:${hashtagId}`,
        ...(Array.isArray(value) ? value : [value]),
      )

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.error('Create sentence error', error)

      return handleError(error)
    }
  },
  async PUT(req: NextRequest) {
    try {
      const { hashtagId, value, index } = await req.json()

      const response = await kv.lset(`hashtag:${hashtagId}`, index, value)

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.error('Update sentence error', error)

      return handleError(error)
    }
  },
  async DELETE(req: NextRequest) {
    try {
      const hashtagId = req.nextUrl.searchParams.get('hashtagId')?.toString()
      const value = req.nextUrl.searchParams.get('value')?.toString()

      const response = await kv.lrem(`hashtag:${hashtagId}`, 0, value)

      return new Response(JSON.stringify(response))
    } catch (error) {
      console.error('Delete sentence error', error)

      return handleError(error)
    }
  },
}
