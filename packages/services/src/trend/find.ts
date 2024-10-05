import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@fc/lib'
import { Trend } from '@fc/types'

export const getTrends = async () => {
  const response = await strapiRequest<Trend>({
    endpoint: 'trend',
  })

  return response?.data || null
}

export const useTrends = () => {
  return useQuery({ queryKey: ['trends-data'], queryFn: getTrends })
}
