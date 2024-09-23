import { NextRequest } from 'next/server'

import { hashtagSentencesEdgeHandler } from '@fc/services/api/hashtagSentencesEdgeHandler'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return hashtagSentencesEdgeHandler.GET(req)
}

export async function POST(req: NextRequest) {
  return hashtagSentencesEdgeHandler.POST(req)
}

export async function PUT(req: NextRequest) {
  return hashtagSentencesEdgeHandler.PUT(req)
}

export async function DELETE(req: NextRequest) {
  return hashtagSentencesEdgeHandler.DELETE(req)
}
