export default ({ env }) => {
  return {
    connection: {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        port: env.int('DATABASE_PORT', 5432),
        pool: {
          min: 0,
          max: 10,
          idleTimeoutMillis: 30000000,
          createTimeoutMillis: 30000000,
          acquireTimeoutMillis: 30000000,
          propagateCreateError: false,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      },
      debug: false,
    },
  }
}
