export default ({ env }) => [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // Enable the download of the Monaco editor
          // from cdn.jsdelivr.net.
          'script-src': ["'self'", 'cdn.jsdelivr.net', 'blob:'],
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            env('CF_PUBLIC_ACCESS_URL').replace(/^https?:\/\//, ''),
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            env('CF_PUBLIC_ACCESS_URL').replace(/^https?:\/\//, ''),
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
