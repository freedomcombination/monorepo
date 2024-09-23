import { GetServerSidePropsContext } from 'next/types'

import { getArtistById } from './getById'
import { getArtByArtist } from '../art/getByArtist'

export const getArtistServerProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.['id'] as string

  const artist = await getArtistById(id)
  const arts = artist ? await getArtByArtist(artist.id) : []

  return { artist, arts }
}
