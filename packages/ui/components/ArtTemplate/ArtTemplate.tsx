import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useTranslation } from 'next-i18next'

import { RecaptchaKeys } from '@fc/config/constants'
import { useArtBySlug } from '@fc/services/art/getArtBySlug'
import { useArtsByCategories } from '@fc/services/art/getArtsByCategories'
import { useViewArtMutation } from '@fc/services/art/viewArt'
import { useRecaptchaToken } from '@fc/services/common/useRecaptchaToken'

import '@splidejs/react-splide/css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { ArtCard } from '../ArtCard'
import { ArtWithDetails } from '../ArtWithDetails'
import { Container } from '../Container'

export const ArtTemplate = () => {
  const { t } = useTranslation()
  const perPage = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 })

  const likeRecaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)
  const viewRecaptchaToken = useRecaptchaToken(RecaptchaKeys.VIEW_ART)

  useViewArtMutation(viewRecaptchaToken)

  const { data: art, refetch } = useArtBySlug()

  const categories = (art?.categories?.flatMap(
    (c: { slug: string }) => c.slug,
  ) || []) as string[]

  const { data: arts, refetch: refetchArts } = useArtsByCategories(
    categories,
    art?.id,
  )

  if (!art) return null

  return (
    <Container minH="inherit" my={8}>
      {/* TODO Create skeleton components for ArtDetail ArtContent and Comments */}
      <ArtWithDetails art={art} refetch={refetch} />

      {/* Other Arts List */}
      {arts && arts?.length > 0 && (
        <Stack justify="space-between" w="full" mt={8} gap={8}>
          <Heading as="h3" size="lg">
            {t('art.others')}
          </Heading>
          {/* TODO Add ArtCardSkeleton for loading state. */}
          <Splide
            options={{
              perPage,
              gap: '1rem',
            }}
          >
            {arts.map(art => (
              <SplideSlide key={art.id}>
                <ArtCard
                  art={art}
                  refetch={refetchArts}
                  recaptchaToken={likeRecaptchaToken}
                  imageHeight={300}
                />
              </SplideSlide>
            ))}
          </Splide>
        </Stack>
      )}
    </Container>
  )
}
