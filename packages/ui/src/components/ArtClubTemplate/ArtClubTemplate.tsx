import { FC, useState } from 'react'

import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Grid,
  HStack,
  IconButton,
  Skeleton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { parse } from 'querystring'
import { MdMenuOpen } from 'react-icons/md'

import { RecaptchaKeys } from '@fc/config'
import { useRecaptchaToken, useStrapiRequest } from '@fc/services'
import { Art, Category } from '@fc/types'

import { useChangeParams } from '../../hooks'
import { AnimatedBox } from '../AnimatedBox'
import { ArtCard, ArtCardSkeleton } from '../ArtCard'
import { ArtSideBar } from '../ArtClubSideBar'
import { CategoryFilterSkeleton } from '../CategoryFilter'
import { Container } from '../Container'
import { CreateArtForm } from '../CreateArtForm'
import { MasonryGrid } from '../MasonryGrid'
import { Pagination } from '../Pagination'
import { SearchForm } from '../SearchForm'

export const ArtClubTemplate: FC = () => {
  const {
    query: { categories, page, searchTerm },
    locale,
  } = useRouter()

  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)

  const changeParam = useChangeParams()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
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
  // the query params in services/src/art/getClubQueryClient.ts to use the cache properly
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
      ...(searchTerm && {
        [`title_${locale}`]: { $containsi: searchTerm as string },
      }),
    },
  })

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody py={8}>
            <ArtSideBar
              categoryList={categoryQuery.data?.data || []}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
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
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </Box>

          <Stack w="full" gap={4}>
            <HStack>
              <SearchForm
                placeholder={t('search') as string}
                onSearch={value => changeParam({ searchTerm: value as string })}
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

            {!artsQuery.isLoading && (
              <Center>
                {artsQuery.data?.meta?.pagination && (
                  <Pagination
                    totalCount={artsQuery.data.meta.pagination?.pageCount}
                    currentPage={artsQuery.data.meta.pagination?.page}
                    onPageChange={page =>
                      changeParam({ page: page.toString() })
                    }
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
