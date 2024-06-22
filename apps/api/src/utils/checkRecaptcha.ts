/* eslint-disable @typescript-eslint/no-explicit-any */
import { errors } from '@strapi/utils'

const { ForbiddenError } = errors

export const checkRecaptcha = async () => {
  const ctx = strapi.requestContext.get()

  if (process.env.NODE_ENV === 'development') return

  const recaptchaToken = (ctx.request as any).body?.data?.recaptchaToken

  if (!recaptchaToken) {
    throw new ForbiddenError('Recaptcha token required')
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      mode: 'no-cors',
      body: `secret=${secret}&response=${recaptchaToken}`,
    },
  )

  const recaptcha = await response.json()

  if (!recaptcha.success || recaptcha.score < 0.7) {
    // TODO: How to send the error details to the client?
    throw new ForbiddenError('Recaptcha failed', {
      details: {
        errorCode: recaptcha['error-codes'],
        score: recaptcha.score,
      },
    })
  }
}
