import tasks from './cron'

export default ({ env }) => {
  const isDev = env('NODE_ENV') === 'development'
  const isProd = env('NEXT_PUBLIC_ENVIRONMENT') === 'production'

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
    cron: {
      enabled: isProd || env.bool('ENABLE_LOCAL_CRON'),
      tasks,
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
    ...(isDev && {
      proxy: true,
    }),
  }
}
