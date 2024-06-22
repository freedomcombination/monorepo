/* eslint-disable @typescript-eslint/no-explicit-any */
import { errors } from '@strapi/utils'
import { Context } from 'koa'

const { ForbiddenError } = errors

export const checkRecaptcha = async (context: Context) => {
  if (process.env.NODE_ENV === 'development') return

  const recaptchaToken = (context.request as any).body?.data?.recaptchaToken

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
