import type { Site } from '@fc/types'

export const TEST_TIMEOUT = process.env.CI === 'true' ? 10 * 1000 : 120 * 1000

export const ports: Record<Site, number> = {
  // api: 1337,
  dashboard: 3000,
  foundation: 3001,
  kunsthalte: 3002,
  lotus: 3003,
  'trend-rights': 3004,
}

export const stagingUrls: Record<Site, string> = {
  // api: 'https://wsvv-api-staging.onrender.com',
  dashboard: 'https://fc-dashboard.vercel.app',
  foundation: 'https://freedomcombination.vercel.app',
  kunsthalte: 'https://kunsthalte.vercel.app',
  lotus: 'https://lotusvdmedia.vercel.app',
  'trend-rights': 'https://trend-rights.vercel.app',
}

export const projects = Object.keys(ports) as Site[]
