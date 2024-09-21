import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@fc/lib/request'
import type { Topic } from '@fc/types'

export const getTopics = async () => {
  const response = await strapiRequest<Topic>({
    endpoint: 'topic',
  })

  return response?.data || ({} as Topic)
}

export const useTopic = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  })
}
