import { Site } from '@fc/types'

import { ports, stagingUrls } from './config'

export const getVercelUrl = (site: Site) => {
  if (process.env.CI === 'true') {
    return stagingUrls[site]
  }

  return `http://localhost:${ports[site]}`
}
