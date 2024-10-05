import { IncomingMessage, ServerResponse } from 'http'
import { SessionOptions, getIronSession } from 'iron-session'

import { Auth } from '@fc/types'

const secrets = {
  COOKIE_PASSWORD: process.env['SECRET_COOKIE_PASSWORD'] as string,
  DEEPL_API_KEY: process.env['DEEPL_API_KEY'] as string,
  RECAPTCHA_SECRET_KEY: process.env['RECAPTCHA_SECRET_KEY'] as string,
  STRIPE_KEY: process.env['STRIPE_KEY'] as string,
  TOKEN: process.env['API_TOKEN'] as string,
}

type Secrets = keyof typeof secrets

export const getSecret = (key: Secrets) => {
  if (typeof window !== 'undefined') {
    // console.error(key + ' secret should only be used on the server')

    return ''
  }

  return secrets[key]
}

export const sessionOptions: SessionOptions = {
  password: getSecret('COOKIE_PASSWORD') || '12345678901234567890123456789012',
  cookieName: 'fc-session',
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
  },
}

export const getSession = async (
  req: IncomingMessage | Request,
  res: Response | ServerResponse<IncomingMessage>,
) => {
  return await getIronSession<Auth>(req, res, sessionOptions)
}
