import { useQuery } from '@tanstack/react-query'

import type { Activity } from '@fc/types'

import { strapiRequest } from '../common/request'

export const getArtById = async (id: number) => {
  const response = await strapiRequest<Activity>({
    endpoint: 'arts',
    id,
    populate: ['localizations', 'image', 'artist.avatar'],
  })

  return response?.data || null
}

export const useArtById = (id: number) => {
  return useQuery({
    queryKey: ['art', id],
    queryFn: () => getArtById(id),
  })
}
