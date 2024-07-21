import { NextRequest } from 'next/server'

import { quotesEdgeHandler } from '@fc/services/src/api/quotesEdgeHandler'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return quotesEdgeHandler(req)
}
