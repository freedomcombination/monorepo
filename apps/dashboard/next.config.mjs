import withPWAInit from '@ducanh2912/next-pwa'

import nextConfig from '@fc/config/next.config.mjs'

const withPWA = () => {
  if (process.env.NODE_ENV === 'production') {
    return withPWAInit(nextConfig)
  }

  return nextConfig
}

export default withPWA()