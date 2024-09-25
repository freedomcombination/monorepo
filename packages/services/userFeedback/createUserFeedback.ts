import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import type { UserFeedback, UserFeedbackCreateInput } from '@fc/types'

import { mutation } from '../common/mutation'

export const createUserFeedback = async (
  userFeedback: UserFeedbackCreateInput,
  token: string,
  recaptchaToken?: string,
) => {
  if (!userFeedback) {
    throw new Error('feedback field is required')
  }

  await mutation<UserFeedback, UserFeedbackCreateInput>({
    endpoint: 'user-feedbacks',
    method: 'post',
    body: {
      ...userFeedback,
      recaptchaToken,
    },
    token,
  })
}

export const useCreateUserFeedbackMutation = (recaptchaToken?: string) => {
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
