/* eslint-disable @typescript-eslint/no-explicit-any */

export const checkRecaptcha = async () => {
  const ctx = strapi.requestContext.get()

  const recaptchaToken = (ctx.request as any).body?.data?.recaptchaToken

  if (!recaptchaToken) {
    return ctx.forbidden('Recaptcha token required', {
      details: { recaptchaToken },
    })
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

  if (!recaptcha.success || recaptcha.score < 1) {
    // TODO: How to send the error details to the client?
    return ctx.forbidden('Recaptcha failed', {
      details: recaptcha,
    })
  }
}
