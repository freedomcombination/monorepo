import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useRouter } from 'next/router'

import { UploadFile } from '@fc/types'

import { ArtCardImageProps } from './types'
import { WImage } from '../WImage'

export const ArtCardImage: FC<ArtCardImageProps> = ({
  art,
  height = 'full',
  h = 'full',
  isMasonry,
}) => {
  const { locale } = useRouter()

  const image = art?.image?.[0]

  if (!image) return null

  return (
    <Box
      as={Splide}
      sx={{
        '.splide__track': { h: 'full' },
        '.splide__arrow:disabled': {
          opacity: 0,
          pointerEvents: 'none',
        },
      }}
    >
      {art.image?.map(img => (
        <SplideSlide key={img.id}>
          <WImage
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
}
