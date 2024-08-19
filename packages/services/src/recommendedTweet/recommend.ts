import { useMutation } from '@tanstack/react-query'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { RecommendedTweet, RecommendedTweetCreateInput } from '@fc/types'

export const recommendTweet = (
  recommendedTweet: RecommendedTweetCreateInput,
  token: string,
) => {
  return Mutation.post<RecommendedTweet, RecommendedTweetCreateInput>(
    'recommended-tweets',
    recommendedTweet,
    token,
  )
}

export const useRecommendTweet = () => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['create-recommended-tweet'],
    mutationFn: (recommendedTweet: RecommendedTweetCreateInput) => {
      return recommendTweet(recommendedTweet, token as string)
    },
    onSuccess: () => {
      toaster.create({
        title: 'Recommended',
        description: 'Recommended Tweet Created',
        type: 'success',
      })
    },
    onError: () => {
      toaster.create({
        title: 'Error',
        description: 'Something went wrong',
        type: 'error',
      })
    },
  })
}
