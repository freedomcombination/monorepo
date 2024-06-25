import { forwardRef, Fragment } from 'react'

import { Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Page } from './Page'
import { CollectionPagesPops } from './types'
import { WImage } from '../WImage'

export const CollectionPages = forwardRef<HTMLDivElement, CollectionPagesPops>(
  function CollectionPages({ collection, pageBgGdarient }, ref) {
    const router = useRouter()
    const locale = router.locale

    const titleKey = `title_${locale}` as const
    const descriptionKey = `description_${locale}` as const

    if (!collection.arts) return null

    return (
      <>
        {collection.arts.map((art, index) => {
          const image = art?.image?.[0]

          return (
            <Fragment key={index}>
              <Page ref={ref} p={8} bgGradient={pageBgGdarient}>
                <VStack justify="center" w="full" h="full" spacing={4}>
                  {image && (
                    <WImage
                      rounded="sm"
                      maxH="80%"
                      h={'auto'}
                      ratio={
                        image.width && image.height
                          ? image.width / image.height
                          : undefined
                      }
                      src={image}
                      alt={art[titleKey]}
                    />
                  )}
                </VStack>
              </Page>
              <Page ref={ref} bgGradient={pageBgGdarient}>
                <Stack w="full" h="full" justify="center" fontFamily="club">
                  <Heading>{art[titleKey]}</Heading>
                  <Text fontFamily="club" fontSize={'xl'}>
                    {art[descriptionKey]}
                  </Text>
                  <Text fontFamily="club" textAlign="right">
                    {art.artist?.name}
                  </Text>
                </Stack>
                <Text fontFamily="club" pos="absolute" bottom={4} right={6}>
                  {index + 1}
                </Text>
              </Page>
            </Fragment>
          )
        })}
      </>
    )
  },
)
