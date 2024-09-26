import { useQuery } from '@tanstack/react-query'

import type { Topic } from '@fc/types'

import { strapiRequest } from '../common/strapiRequest'

export const getTopics = async () => {
  const response = await strapiRequest<Topic>({
    endpoint: 'topic',
  })

  return response?.data || ({} as Topic)
}

export const useTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  })
}
