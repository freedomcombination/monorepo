import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import { Mutation } from '@fc/lib/mutation'
import type { RecommendedTopic, RecommendedTopicCreateInput } from '@fc/types'

export const recommendTopic = (
  createInput: RecommendedTopicCreateInput,
  token: string,
) =>
  Mutation.post<RecommendedTopic, RecommendedTopicCreateInput>(
    `recommended-topics`,
    createInput,
    token,
  )

export const useRecommendTopic = () => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['recommend-topic'],
    mutationFn: (createInput: RecommendedTopicCreateInput) =>
      recommendTopic(createInput, token as string),
  })
}
