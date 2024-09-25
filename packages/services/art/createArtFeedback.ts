import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import type {
  Art,
  ArtUpdateInput,
  Feedback,
  FeedbackArtCreateInput,
} from '@fc/types'

import { mutation } from '../common/mutation'

export const createArtFeedback = async ({
  token,
  ...args
}: FeedbackArtCreateInput & { token: string }) => {
  if (!args.message) {
    throw new Error('feedback field is required')
  }
  const body: ArtUpdateInput = {
    approvalStatus: args.status,
    publishedAt: args.status === 'approved' ? new Date().toISOString() : null,
  }

  await mutation<Feedback, FeedbackArtCreateInput>({
    endpoint: 'feedbacks',
    method: 'post',
    body: args,
    token,
  })

  return await mutation<Art, ArtUpdateInput>({
    endpoint: 'arts',
    method: 'put',
    id: args.art,
    body,
    token,
  })
}

export const useCreateArtFeedbackMutation = () => {
  const toast = useToast()

  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['art-feedback'],
    mutationFn: ({ art, message, status }: FeedbackArtCreateInput) =>
      createArtFeedback({
        art,
        message,
        status,
        point: 1,
        token: token as string,
      }),
    onSuccess: res => {
      toast({
        title: `Art ${res?.data?.approvalStatus}`,
        description: `Art has been ${res?.data?.approvalStatus}`,
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
