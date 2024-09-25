import { FC } from 'react'

import { Grid, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { Art, Comment } from '@fc/types'

import { ArtContent } from '../ArtContent'
import { ArtDetail } from '../ArtDetail'
import { CommentForm } from '../CommentForm'
import { CommentList } from '../CommentList'

type ArtWithDetailsProps = {
  art: Art
  refetch?: () => void
}

const ArtWithDetails: FC<ArtWithDetailsProps> = ({ art, refetch }) => {
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

      <ArtDetail art={art} refetch={refetch} />

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
