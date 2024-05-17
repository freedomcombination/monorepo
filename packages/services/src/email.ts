import { EMAIL_SENDER, EMAIL_RECEIVER, API_URL } from '@fc/config'
import { Mutation } from '@fc/lib'
import { EmailCreateInput } from '@fc/types'

export const sendEmail = async (
  data: EmailCreateInput,
  token: string,
  recaptchaToken?: string,
) => {
  const body: EmailCreateInput = {
    ...data,
    to: data.to || EMAIL_RECEIVER || EMAIL_SENDER,
    from: EMAIL_SENDER as string,
    recaptchaToken,
  }

  if (!recaptchaToken)
    // in case sendEmail can be used in future somewhere else without recaptcha
    Mutation.post('email', body, token)
  else {
    // sendMail uses plugin::email so i cant intercept it
    // so i create custom route /contact/email
    // and this route needs public permission for all users
    // its under 'feedback'
    const url = API_URL + '/api/contact/email'
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }
}
