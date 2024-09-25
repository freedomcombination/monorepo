import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import { Topic } from '@fc/types'

import { mutation } from '../common/mutation'

export const syncTopics = async (token: string) => {
  return mutation<Topic>({
    endpoint: 'topic/sync',
    method: 'post',
    token,
    body: {},
  })
}

export const useSyncTopicsMutation = () => {
  const queryClient = useQueryClient()

  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['topics-sync'],
    mutationFn: () => syncTopics(token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] })
    },
  })
}
