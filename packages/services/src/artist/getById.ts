import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@fc/lib'
import { Profile } from '@fc/types'

import { getArtByArtist } from '../art/getByArtist'
import { getSecret } from '@fc/secrets'

export const getArtistById = async (id: string): Promise<Profile | null> => {
  const artistResponse = await strapiRequest<Profile>({
    endpoint: 'profiles',
    id: Number(id),
    populate: '*',
    token: getSecret('TOKEN'),
  })

  const artist = artistResponse.data

  if (!artist) return null

  const ownedArts = await getArtByArtist(artist.id)

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
