import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export const quotesEdgeHandler = async (req: NextRequest) => {
  const method = req.method

  try {
    if (method === 'POST') {
      const { value } = await req.json()

      const response = await kv.rpush(`quotes`, value)

      return NextResponse.json(response)
    }

    if (method === 'PUT') {
      const { value, index } = await req.json()

      const response = await kv.lset(`quotes`, index, value)

      return NextResponse.json(response)
    }

    if (method === 'DELETE') {
      const value = req.nextUrl.searchParams.get('value')?.toString()

      const result = await kv.lrem(`quotes`, 0, value)

      return NextResponse.json(result)
    }

    const result = await kv.lrange(`quotes`, 0, -1)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.error()
  }
}
