export default [
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
          'frame-src': ["'self'"],
          'frame-ancestors': ["'self'"],
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
