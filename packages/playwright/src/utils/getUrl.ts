import type { Site } from '@fc/types'

import { ports, stagingUrls } from '../config'

export const getUrl = (site: Site) => {
  if (process.env.CI === 'true') {
    return stagingUrls[site]
  }

  return `http://localhost:${ports[site]}`
}

export const getApiUrl = () => {
  if (process.env.CI === 'true') {
    return 'https://wsvv-api-staging.onrender.com/api'
  }

  return `http://localhost:1337/api`
}
