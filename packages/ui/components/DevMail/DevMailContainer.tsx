import { VERCEL_ENV } from '@fc/config/constants'

import { DevMailProvider } from './DevMailProvider'

export const DevMailContainer = () => {
  console.log('VERCEL_ENV', VERCEL_ENV)
  if (VERCEL_ENV === 'production') return null

  return <DevMailProvider />
}
