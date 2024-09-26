import { GetServerSidePropsContext } from 'next/types'

import { getArtistById } from './getArtistById'
import { getArtsByArtist } from '../art/getArtsByArtist'

export const getArtistServerProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.['id'] as string

  const artist = await getArtistById(id)
  const arts = artist ? await getArtsByArtist(artist.id) : []

  return { artist, arts }
}
