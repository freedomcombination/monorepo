import { withHydrationOverlayWebpack } from '@builder.io/react-hydration-overlay/webpack'

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
  transpilePackages: [
    '@fc/config',
    '@fc/context',
    '@fc/lib',
    '@fc/services',
    '@fc/ui',
    '@fc/utils',
    '@builder.io/react-hydration-overlay',
    'next-mdx-remote',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'tr'],
  },
  redirects: async () => [
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
  webpack: (config, options) => {
    config = withHydrationOverlayWebpack({
      appRootSelector: '#__next',
      isMainAppEntryPoint: entryPointName =>
        !options.isServer && entryPointName === 'pages/_app',
    })(config)

    return config
  },
}

export default nextConfig
