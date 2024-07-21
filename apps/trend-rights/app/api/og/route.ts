import { NextRequest } from 'next/server'

import { ogEdgeHandler } from '@fc/services/src/api/ogEdgeHandler'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return ogEdgeHandler(req)
}
