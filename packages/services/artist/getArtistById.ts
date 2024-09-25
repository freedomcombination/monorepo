import { useQuery } from '@tanstack/react-query'

import { getSecret } from '@fc/secrets'
import type { Profile } from '@fc/types'

import { getArtsByArtist } from '../art/getArtsByArtist'
import { strapiRequest } from '../common/request'

export const getArtistById = async (id: string): Promise<Profile | null> => {
  const artistResponse = await strapiRequest<Profile>({
    endpoint: 'profiles',
    id: Number(id),
    populate: '*',
    token: getSecret('TOKEN'),
  })

  const artist = artistResponse.data

  if (!artist) return null

  const ownedArts = await getArtsByArtist(artist.id)

  return {
    ...artist,
    ownedArts,
  }
}

export const useArtistById = (id: string) => {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: () => getArtistById(id),
  })
}
