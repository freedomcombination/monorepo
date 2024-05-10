import withPWAInit from '@ducanh2912/next-pwa'

import nextConfig from '@fc/config/next.config.mjs'

const withPWA = withPWAInit({
    dest: "public"
})

export default withPWA(nextConfig)

