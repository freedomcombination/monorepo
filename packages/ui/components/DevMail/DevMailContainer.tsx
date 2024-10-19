import { VERCEL_ENV } from '@fc/config/constants'

import { DevMailProvider } from './DevMailProvider'

export const DevMailContainer = () => {
  if (VERCEL_ENV === 'production') return null

  return <DevMailProvider />
}
