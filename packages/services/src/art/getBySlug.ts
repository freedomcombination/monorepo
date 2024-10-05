import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context'
import { strapiRequest } from '@fc/lib'
import { Art } from '@fc/types'

export const getArtBySlug = async (
  slug: string,
  token?: string | null,
): Promise<Art | null> => {
  const response = await strapiRequest<Art>({
    endpoint: 'arts',
    filters: { slug: { $eq: slug } },
    populate: [
      'artist.avatar',
      'categories',
      'image',
      'localizations',
      'comments.user.avatar',
    ],
    ...(token && { token }),
  })

  return response?.data?.[0] || null
}

export const useArtBySlug = () => {
  const { query } = useRouter()
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['art', query.slug],
    queryFn: () => getArtBySlug(query.slug as string, token),
  })
}
