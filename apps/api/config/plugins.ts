export default ({ env }) => ({
  'import-export-entries': {
    enabled: true,
  },
  email: {
    enabled: true,
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'mail.privateemail.com',
        port: 465,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: 'info@freedomcombination.com',
        defaultReplyTo: 'info@freedomcombination.com',
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
  // upload: {
  //   config: {
  //     breakpoints: {
  //       xlarge: 1920,
  //       large: 1080,
  //       medium: 720,
  //       small: 512,
  //       xsmall: 64,
  //     },
  //   },
  // },
  upload: {
    config: {
      breakpoints: {
        lg: 1080,
        md: 720,
        sm: 512,
      },
      provider: 'strapi-provider-cloudflare-r2',
      providerOptions: {
        accessKeyId: env('CF_ACCESS_KEY_ID'),
        secretAccessKey: env('CF_ACCESS_SECRET'),
        endpoint: env('CF_ENDPOINT'),
        params: {
          Bucket: env('CF_BUCKET'),
        },
        cloudflarePublicAccessUrl: env('CF_PUBLIC_ACCESS_URL'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
})
