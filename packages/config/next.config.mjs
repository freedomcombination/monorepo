import { withSentryConfig } from '@sentry/nextjs'

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'tr'],
  },
  redirects: async () => [
    ...['login', 'register', 'forgot-password', 'reset'].map(path => ({
      source: `/${path}`,
      destination: `/auth/${path}`,
      permanent: true,
    })),
    {
      source: '/donate',
      destination: '/donation',
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      {
        hostname: 'api.freedomcombination.com',
      },
    ],
    deviceSizes: [320, 480, 720, 1080],
    imageSizes: [150],
  },
}

const getWithSentryConfig = () =>
  withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
    telemetry: false,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  })

const getConfig = () => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
    return getWithSentryConfig()
  }

  return nextConfig
}

export default getConfig()
