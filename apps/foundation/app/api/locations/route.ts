import { NextRequest } from 'next/server'

import { searchLocationHandler } from '@fc/services/api/searchLocationHandler'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  return searchLocationHandler(req)
}
