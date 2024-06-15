import { useMutation } from '@tanstack/react-query'

import { EMAIL, PUBLIC_TOKEN, RecaptchaKeys } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { EmailCreateInput } from '@fc/types'

import { useRecaptchaToken } from './common'

export const sendEmail = async (
  data: EmailCreateInput,
  token: string | null,
  recaptchaToken?: string,
) => {
  const body: EmailCreateInput = {
    ...data,
    to: data.to || EMAIL,
    from: EMAIL as string,
    // Only include recaptchaToken if PUBLIC_TOKEN is used
    ...(!token && { recaptchaToken }),
  }

  return Mutation.post('contact/email', body, token || PUBLIC_TOKEN)
}

export const useSendEmail = () => {
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.CONTACT_FORM)
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['email'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(data, token, recaptchaToken)
    },
  })
}
