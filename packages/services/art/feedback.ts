import { useMutation } from '@tanstack/react-query'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { Mutation } from '@fc/lib/mutation'
import type {
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
      toaster.create({
        title: `Art ${res?.data?.approvalStatus}`,
        description: `Art has been ${res?.data?.approvalStatus}`,
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
