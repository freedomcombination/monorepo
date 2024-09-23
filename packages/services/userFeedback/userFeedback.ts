import { useMutation } from '@tanstack/react-query'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { Mutation } from '@fc/lib/mutation'
import type { UserFeedback, UserFeedbackCreateInput } from '@fc/types'

export const createUserFeedback = async (
  userFeedback: UserFeedbackCreateInput,
  token: string,
  recaptchaToken?: string,
) => {
  if (!userFeedback) {
    throw new Error('feedback field is required')
  }

  await Mutation.post<UserFeedback, UserFeedbackCreateInput>(
    'user-feedbacks',
    {
      ...userFeedback,
      recaptchaToken,
    },
    token,
  )
}

export const useUserFeedbackMutation = (recaptchaToken?: string) => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['user-feedback'],
    mutationFn: (userFeedback: UserFeedbackCreateInput) => {
      return createUserFeedback(userFeedback, token as string, recaptchaToken)
    },
    onSuccess: () => {
      toaster.create({
        title: `Feedback.`,
        description: `We recieved your feedback. Thank you for your opinion.`,
        type: 'success',
      })
    },
    onError: error => {
      console.error(error)
      toaster.create({
        title: 'Error',
        description: 'Something went wrong',
        type: 'error',
      })
    },
  })
}
