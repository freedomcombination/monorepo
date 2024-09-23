import { useQuery } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import { strapiRequest } from '@fc/lib/request'
import type { Art } from '@fc/types'

export const getArtByArtist = async (
  profileId: number,
  includeDrafts?: boolean,
) => {
  if (!profileId) return []

  const response = await strapiRequest<Art>({
    endpoint: 'arts',
    filters: {
      artist: { id: { $eq: profileId } },
    },
    populate: [
      'artist.avatar',
      'categories',
      'image',
      'localizations',
      'comments.user.avatar',
      'likers',
    ],
    includeDrafts,
  })

  return response?.data
}

export const useProfileArts = (includeDrafts?: boolean) => {
  const { profile } = useAuthContext()

  const profileId = profile?.id

  return useQuery({
    queryKey: ['user-arts', profileId],
    queryFn: () => getArtByArtist(profileId as number, includeDrafts),
  })
}
