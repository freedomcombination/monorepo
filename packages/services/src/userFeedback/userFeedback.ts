import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { UserFeedback, UserFeedbackCreateInput } from '@fc/types'
import { useToast } from '@fc/ui'

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
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['user-feedback'],
    mutationFn: (userFeedback: UserFeedbackCreateInput) => {
      return createUserFeedback(userFeedback, token as string, recaptchaToken)
    },
    onSuccess: () => {
      toast({
        title: `Feedback.`,
        description: `We recieved your feedback. Thank you for your opinion.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: error => {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
