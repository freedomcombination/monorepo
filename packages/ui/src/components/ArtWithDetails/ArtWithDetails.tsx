import { FC } from 'react'

import { Box, Grid, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { RecaptchaKeys } from '@fc/config'
import {
  useRecaptchaToken,
  useStrapiRequest,
  useViewArtMutation,
} from '@fc/services'
import { Art, Comment } from '@fc/types'

import { ArtContent, ArtDetail, CommentForm, CommentList } from '../'

type ArtWithDetailsProps = {
  art: Art
  refetch?: () => void
}

export const ArtWithDetails: FC<ArtWithDetailsProps> = ({ art, refetch }) => {
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.VIEW_ART)

  useViewArtMutation(recaptchaToken)

  const { locale } = useRouter()

  const commentQuery = useStrapiRequest<Comment>({
    endpoint: 'comments',
    filters: { art: { id: { $eq: art?.id } } },
    populate: ['profile.avatar'],
    queryOptions: {
      enabled: !!art,
    },
  })

  if (!art) return null

  const titleKey = `title_${locale}` as const
  const descriptionKey = `description_${locale}` as const

  return (
    <Grid
      pos="relative"
      gridTemplateColumns={{ base: '1fr', lg: '3fr 2fr' }}
      gap={4}
      alignItems="start"
      h={'full'}
    >
      {/* Single Art Images */}
      <Box pos={{ lg: 'sticky' }} top={0} h={'full'}>
        <ArtDetail art={art} refetch={refetch} />
      </Box>

      <Stack spacing={4}>
        {/* Single Art Content */}
        <ArtContent
          title={art[titleKey]}
          artistName={
            art.artist?.name || art.artist?.email || 'Unknown Artist Name'
          }
          artistAvatar={art.artist?.avatar?.url}
          description={art[descriptionKey]}
          artistProfilePath={`/club/artist/${art.artist?.id}`}
        />
        {/* Single Art Comments */}
        <Stack spacing={4}>
          {/*  Comment form */}
          <CommentForm artId={art.id} onSuccess={commentQuery.refetch} />

          {/* List comments of the current art */}
          {/* TODO Add CommentSkeleton */}
          <CommentList comments={commentQuery.data?.data || []} />
        </Stack>
      </Stack>
    </Grid>
  )
}

export default ArtWithDetails
