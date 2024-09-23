import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { Box, Center, Grid, HStack, Skeleton, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { parse } from 'querystring'
import { MdMenuOpen } from 'react-icons/md'

import {
  Alert,
  Pagination,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
} from '@fc/chakra'
import { RecaptchaKeys } from '@fc/config/constants'
import { useStrapiRequest } from '@fc/services/common/request'
import { useRecaptchaToken } from '@fc/services/common/useRecaptchaToken'
import type { Art, Category } from '@fc/types'

import { useChangeParams } from '../../hooks'
import { AnimatedBox } from '../AnimatedBox'
import { ArtCard, ArtCardSkeleton } from '../ArtCard'
import { ArtSideBar } from '../ArtClubSideBar'
import { CategoryFilterSkeleton } from '../CategoryFilter'
import { Container } from '../Container'
import { CreateArtForm } from '../CreateArtForm'
import { MasonryGrid } from '../MasonryGrid'
import { SearchForm } from '../SearchForm'

export const ArtClubTemplate: FC = () => {
  const {
    query: { categories, page, q },
    locale,
  } = useRouter()

  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)

  const { changePage, changeSearch } = useChangeParams()
  const [loading, setLoading] = useState(false)
  const { open, onOpen, onToggle } = useDisclosure()
  const { t } = useTranslation()

  const categoryQuery = useStrapiRequest<Category>({
    endpoint: 'categories',
    pageSize: 100,
    filters: {
      arts: {
        id: {
          $gt: 0,
        },
      },
    },
  })

  // Note: Keep the order of the query params in the same order as
  // the query params in services/art/getClubQueryClient.ts to use the cache properly
  const artsQuery = useStrapiRequest<Art>({
    endpoint: 'arts',
    locale,
    page: parseInt(page as string) || 1,
    filters: {
      approvalStatus: { $eq: 'approved' },
      ...(categories && {
        categories: {
          slug: {
            $in: Object.values(parse(categories as string)) as string[],
          },
        },
      }),
      ...(q && {
        [`title_${locale}`]: { $containsi: q as string },
      }),
    },
  })

  return (
    <>
      <Drawer open={open} onOpenChange={onToggle}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody py={8}>
            <ArtSideBar
              categoryList={categoryQuery.data?.data || []}
              loading={loading}
              setLoading={setLoading}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container minH="inherit">
        <Grid
          w="full"
          gap={4}
          my={8}
          gridTemplateColumns={{ base: '1fr', lg: '200px 1fr' }}
        >
          <Box display={{ base: 'none', lg: 'block' }}>
            {categoryQuery.isLoading ? (
              <Stack
                direction={{ base: 'row', lg: 'column' }}
                justify="stretch"
                align="center"
                w="full"
                overflowX={{ base: 'auto', lg: 'hidden' }}
                gap={4}
              >
                <Skeleton h={8} w="full" rounded="md" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <CategoryFilterSkeleton
                    key={'category-filter-skeleton' + i}
                  />
                ))}
              </Stack>
            ) : (
              <ArtSideBar
                categoryList={categoryQuery.data?.data || []}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          </Box>

          <Stack w="full" gap={4}>
            <HStack>
              <SearchForm
                placeholder={t('search') as string}
                onSearch={changeSearch}
                isFetching={artsQuery.isFetching}
              />
              <CreateArtForm />
              <IconButton
                display={{ base: 'flex', lg: 'none' }}
                variant="outline"
                size="lg"
                aria-label="open-menu"
                icon={<MdMenuOpen />}
                onClick={onOpen}
              />
            </HStack>
            {!artsQuery.isLoading && artsQuery.data?.data?.length === 0 ? (
              <Alert
                status="info"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                gap={4}
                rounded={'lg'}
              >
                <Box fontWeight={600} maxWidth="sm">
                  {t('no-results-found')}
                </Box>
              </Alert>
            ) : (
              <MasonryGrid columnGap={2} rowGap={2}>
                {artsQuery.isLoading
                  ? Array.from({ length: 12 }).map((_, i) => (
                      <ArtCardSkeleton
                        key={'masonry-grid-skeleton' + i}
                        isMasonry
                      />
                    ))
                  : artsQuery.data?.data?.map((art, i) => {
                      return (
                        <AnimatedBox
                          key={art.id}
                          directing="to-down"
                          delay={i * 0.5}
                        >
                          <ArtCard
                            art={art}
                            refetch={artsQuery.refetch}
                            isMasonry
                            recaptchaToken={recaptchaToken}
                          />
                        </AnimatedBox>
                      )
                    })}
              </MasonryGrid>
            )}
            {!artsQuery.isLoading && (
              <Center>
                {artsQuery.data?.meta?.pagination && (
                  <Pagination
                    count={artsQuery.data.meta.pagination?.pageCount}
                    page={artsQuery.data.meta.pagination?.page}
                    onPageChange={changePage}
                  />
                )}
              </Center>
            )}
          </Stack>
        </Grid>
      </Container>
    </>
  )
}
