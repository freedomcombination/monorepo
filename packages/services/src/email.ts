import { useMutation } from '@tanstack/react-query'

import { EMAIL, RecaptchaKeys } from '@fc/config'
import { Mutation } from '@fc/lib'
import { EmailCreateInput } from '@fc/types'

import { useRecaptchaToken } from './common'

export const sendEmail = async (
  data: EmailCreateInput,
  token?: string | null,
  recaptchaToken?: string,
) => {
  const body: EmailCreateInput = {
    ...data,
    to: data.to || EMAIL,
    from: EMAIL as string,
    ...(!token && { recaptchaToken }),
  }

  return Mutation.post('contact/email', body, '')
}

export const useSendEmail = (token?: string) => {
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.CONTACT_FORM)

  return useMutation({
    mutationKey: ['email'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(data, token, recaptchaToken)
    },
  })
}
