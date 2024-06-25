import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useTranslation } from 'next-i18next'

import { RecaptchaKeys } from '@fc/config'
import {
  useArtBySlug,
  useArtsByCategories,
  useRecaptchaToken,
} from '@fc/services'

import { ArtCard, ArtWithDetails, Container } from '../../components'

import '@splidejs/react-splide/css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

export const ArtTemplate = () => {
  const { t } = useTranslation()
  const perPage = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 })

  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)

  const { data: art, refetch } = useArtBySlug()

  const categories = (art?.categories?.flatMap(
    (c: { slug: string }) => c.slug,
  ) || []) as string[]

  const { data: arts } = useArtsByCategories(categories, art?.id)

  if (!art) return null

  return (
    <Container minH="inherit" my={8}>
      {/* TODO Create skeleton components for ArtDetail ArtContent and Comments */}
      <ArtWithDetails />

      {/* Other Arts List */}
      {arts && arts?.length > 0 && (
        <Stack justify="space-between" w="full" mt={8} spacing={8}>
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
                  refetch={refetch}
                  recaptchaToken={recaptchaToken}
                />
              </SplideSlide>
            ))}
          </Splide>
        </Stack>
      )}
    </Container>
  )
}
