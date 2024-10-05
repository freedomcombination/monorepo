import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import {
  Art,
  ArtUpdateInput,
  Feedback,
  FeedbackArtCreateInput,
} from '@fc/types'

export const createFeedback = async ({
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
  await Mutation.post<Feedback, FeedbackArtCreateInput>(
    'feedbacks',
    args as FeedbackArtCreateInput,
    token,
  )

  return Mutation.put<Art, ArtUpdateInput>('arts', args.art, body, token)
}

export const useArtFeedbackMutation = () => {
  const toast = useToast()

  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['art-feedback'],
    mutationFn: ({ art, message, status }: FeedbackArtCreateInput) =>
      createFeedback({
        art,
        message,
        status,
        point: 1,
        token: token as string,
      }),
    onSuccess: res => {
      toast({
        title: `Art ${res?.approvalStatus}`,
        description: `Art has been ${res?.approvalStatus}`,
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
