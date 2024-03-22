import { FC } from 'react'

import { Box, Grid, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import {
  useArtBySlug,
  useStrapiRequest,
  useViewArtMutation,
  useRecaptchaToken,
} from '@fc/services'
import { Comment } from '@fc/types'

import {
  ArtContent,
  ArtDetail,
  CommentForm,
  CommentList,
} from '../../components'

export const ArtWithDetails: FC = () => {
  const recaptchaToken = useRecaptchaToken('view_art')

  useViewArtMutation(recaptchaToken)

  const { data: art } = useArtBySlug()

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
    >
      {/* Single Art Images */}
      <Box pos={{ lg: 'sticky' }} top={0}>
        <ArtDetail />
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
