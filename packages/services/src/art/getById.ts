import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@fc/lib'
import { Activity } from '@fc/types'

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
