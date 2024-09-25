import { useQuery } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import type { Art } from '@fc/types'

import { strapiRequest } from '../common/strapiRequest'

export const getArtsByCategories = async (
  categories: string[],
  id?: number,
  token?: string | null,
) => {
  const response = await strapiRequest<Art>({
    endpoint: 'arts',
    filters: {
      categories: { slug: { $in: categories } },
      id: { $ne: id },
      approvalStatus: { $eq: 'approved' },
    },
    populate: ['artist.avatar', 'categories', 'image'],
    ...(token && { token }),
  })

  return response?.data
}

export const useArtsByCategories = (categories: string[], id?: number) => {
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['arts', categories, id],
    queryFn: () => getArtsByCategories(categories, id, token),
    enabled: !!id,
  })
}
