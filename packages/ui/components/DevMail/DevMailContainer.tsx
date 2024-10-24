import { NEXT_PUBLIC_ENVIRONMENT } from '@fc/config/constants'

import { DevMailProvider } from './DevMailProvider'

export const DevMailContainer = () => {
  console.log('NEXT_PUBLIC_ENVIRONMENT', NEXT_PUBLIC_ENVIRONMENT)
  if (NEXT_PUBLIC_ENVIRONMENT === 'production') return null

  return <DevMailProvider />
}
