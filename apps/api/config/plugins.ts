export default ({ env }) => ({
  'import-export-entries': {
    enabled: true,
  },
  email: {
    enabled: true,
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_USERNAME'),
        defaultReplyTo: env('SMTP_USERNAME'),
      },
    },
  },
  transformer: {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  upload: {
    config: {
      breakpoints: {
        xlarge: 1920,
        large: 1080,
        medium: 720,
        small: 512,
        xsmall: 64,
      },
    },
  },
  sentry: {
    enabled: true,
    config: {
      dsn: env('NODE_ENV') === 'production' ? env('SENTRY_DSN') : null,
      sendMetadata: true,
    },
  },
  documentation: {
    enabled: env('NEXT_PUBLIC_ENVIRONMENT') !== 'production',
    config: {
      info: { version: '1.0.0' },
    },
  },
})
