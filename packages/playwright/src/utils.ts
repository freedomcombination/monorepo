import { AppSlug } from '@fc/types'

import { ports, stagingUrls } from './config'

export const getVercelUrl = (project: AppSlug) => {
  if (process.env['CI'] === 'true') {
    return stagingUrls[project]
  }

  return `http://localhost:${ports[project]}`
}
