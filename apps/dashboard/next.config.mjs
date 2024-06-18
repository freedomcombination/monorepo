import nextConfig from '@fc/config/next.config.mjs'

const withPWA = (await import('@ducanh2912/next-pwa')).default({
  dest: 'public',
  customWorkerSrc: 'worker',
})

export default withPWA(nextConfig)
