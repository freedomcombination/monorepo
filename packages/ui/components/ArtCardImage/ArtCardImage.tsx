import { FC, memo } from 'react'

import { Box } from '@chakra-ui/react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useRouter } from 'next/router'

import type { UploadFile } from '@fc/types'

import { ArtCardImageProps } from './types'
import { WImage } from '../WImage'

export const ArtCardImage: FC<ArtCardImageProps> = memo(
  ({ art, height = 'full', h = 'full', isMasonry }) => {
    const { locale } = useRouter()

    const image = art?.image?.[0]

    if (!image) return null

    if (art?.image?.length === 1) {
      return (
        <WImage
          className="art-image"
          data-testid={`image-art-${art.id}`}
          maxH={'80vh'}
          pos="relative"
          h={isMasonry ? undefined : h || height}
          src={image as UploadFile}
          hasZoom
          alt={art?.[`title_${locale}`]}
          userSelect="none"
          ratio={image.width && image.height ? image.width / image.height : 1}
          sizes="320px"
        />
      )
    }

    return (
      <Box
        as={Splide}
        css={{
          '& .splide__track': { h: 'full', maxH: '80vh' },
          '& .splide__arrow:disabled': {
            opacity: 0,
            pointerEvents: 'none',
          },
        }}
      >
        {art.image?.map(img => (
          <SplideSlide key={img.id}>
            <WImage
              objectFit="contain"
              pos="relative"
              h={isMasonry ? undefined : h || height}
              src={img as UploadFile}
              hasZoom
              alt={art?.[`title_${locale}`]}
              userSelect="none"
              ratio={img.width && img.height ? img.width / img.height : 1}
            />
          </SplideSlide>
        ))}
      </Box>
    )
  },
)

ArtCardImage.displayName = 'ArtCardImage'
