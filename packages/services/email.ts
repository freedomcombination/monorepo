import { useMutation } from '@tanstack/react-query'

import { EMAIL, RecaptchaKeys } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import type { EmailCreateInput } from '@fc/types'

import { mutation } from './common/mutation'
import { useRecaptchaToken } from './common/useRecaptchaToken'

export const sendEmail = async (
  data: EmailCreateInput,
  token: string,
  recaptchaToken?: string,
) => {
  const body: EmailCreateInput = {
    ...data,
    to: data.to || EMAIL,
    from: EMAIL as string,
    ...(!token && { recaptchaToken }),
  }

  return mutation({
    endpoint: 'contact/email',
    method: 'post',
    body,
    token,
  })
}

export const useSendEmail = () => {
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.CONTACT_FORM)
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['email'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(data, token || '', recaptchaToken)
    },
  })
}
