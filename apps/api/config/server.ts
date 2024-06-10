import tasks from './cron'

export default ({ env }) => {
  const isDev = env('NODE_ENV') === 'development'
  const isProd = env('VERCEL_ENV') === 'production'

  return {
    host: env('HOST', '0.0.0.0'),
    app: {
      keys: env.array('APP_KEYS'),
    },
    cron: {
      enabled: isProd || env('ENABLE_LOCAL_CRON'),
      tasks,
    },
    ...(isDev && {
      port: env.int('PORT', 1337),
      proxy: true,
    }),
  }
}
