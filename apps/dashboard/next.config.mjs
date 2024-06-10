import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js'

import nextConfig from '@fc/config/next.config.mjs'

const nextConfigFunction = async phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import('@ducanh2912/next-pwa')).default({
      dest: 'public',
    })

    return withPWA(nextConfig)
  }

  return nextConfig
}

export default nextConfigFunction
