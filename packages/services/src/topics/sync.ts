import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { StrapiCreateInput } from '@fc/types'

export const syncTopics = async (token: string) => {
  Mutation.post('topic/sync', {} as StrapiCreateInput, token)
}

export const useTopicSync = () => {
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
