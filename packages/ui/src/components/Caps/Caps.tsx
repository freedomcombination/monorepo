import {
  AspectRatio,
  Box,
  chakra,
  Flex,
  forwardRef,
  ImageProps,
  Skeleton,
  Stack,
  Text,
  useMergeRefs,
} from '@chakra-ui/react'
import { useMeasure } from 'react-use'

import { platformLogos, platformLogosViewBox } from './logos'
import { CapsProps } from './types'
import { WImage } from '../WImage'

const paths = [
  'M50 337.5L0 0H50V337.5Z',
  'M50 337.5L0 675H50V337.5Z',
  'M0 337.5L50 0V675L0 337.5Z',
  'M45 675H55L55 8.74228e-07L45 0C15.021 168.507 0.0209643 252.819 2.18987e-05 337.135C-0.0209205 421.569 14.9791 506.007 45 675Z',
]

export const Caps = forwardRef<CapsProps, 'div'>(
  ({ imageParams, hasRandomImage, ...rest }, ref) => {
    const {
      title,
      text,
      image,
      shape = 0,
      bg,
      color,
      flip = false,
      hasLine = false,
      platform = 'trend-rights',
      // scale = 1,
    } = imageParams

    const absoluteStyle: ImageProps = {
      position: 'absolute',
      top: 0,
      height: 'full',
    }

    const [divRef, { width }] = useMeasure()

    const mergedRef = useMergeRefs(ref, divRef)

    const transform = flip ? 'scale(1)' : ('scaleX(-1)' as string)

    const Logo = platformLogos[platform]
    const logoViewBox = platformLogosViewBox[platform]

    const proportions = {
      width: 1200 / 1200,
      height: 675 / 1200,
      image: 400 / 1200,
      shape: 50 / 1200,
      logo: 120 / 1200,
      padding: 40 / 1200,
      font: 36 / 1200,
    }

    const dimensions = {
      width: proportions.width * width,
      height: proportions.height * width,
      image: proportions.image * width,
      shape: proportions.shape * width,
      logo: proportions.logo * width,
      padding: proportions.padding * width,
      font: proportions.font * width,
    }

    return (
      <AspectRatio ratio={1200 / 675} {...rest}>
        <Flex ref={mergedRef}>
          {dimensions.width > 0 ? (
            <Flex boxSize={'full'} bg={bg} pos={'relative'}>
              <WImage
                loading={'lazy'}
                {...absoluteStyle}
                w={`${dimensions.image}px`}
                objectFit={'cover'}
                left={flip ? '0px' : `${dimensions.width - dimensions.image}px`}
                src={
                  image ||
                  (hasRandomImage ? 'https://picsum.photos/300/675' : undefined)
                }
                alt={''}
              />
              <chakra.svg
                position={'absolute'}
                top={'0px'}
                height={'full'}
                w={`${dimensions.shape}px`}
                h={`${dimensions.height}px`}
                left={
                  flip
                    ? `${dimensions.image - dimensions.shape}px`
                    : `${dimensions.width - dimensions.image}px`
                }
                transform={transform}
                viewBox="0 0 50 675"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path key={shape} d={paths[shape]} fill={bg} />
              </chakra.svg>

              {/* Logo */}
              <chakra.svg
                xmlns="http://www.w3.org/2000/svg"
                width={`${dimensions.logo}px`}
                height={`${dimensions.logo}px`}
                position={'absolute'}
                bottom={`${dimensions.padding}px`}
                left={
                  flip
                    ? `${dimensions.image / 2 - dimensions.shape}px`
                    : `${
                        dimensions.width -
                        dimensions.image / 2 -
                        dimensions.shape
                      }px`
                }
                viewBox={logoViewBox}
              >
                {Logo}
              </chakra.svg>

              {/* Content */}
              <Stack
                pos={'absolute'}
                top={dimensions.padding}
                bottom={dimensions.padding}
                left={`${
                  flip
                    ? dimensions.image + dimensions.shape
                    : dimensions.padding
                }px`}
                right={`${
                  flip
                    ? dimensions.padding
                    : dimensions.image + dimensions.shape
                }px`}
                spacing={`${dimensions.font / 2}px`}
                userSelect={'none'}
              >
                {title && (
                  <Text
                    fontSize={`${dimensions.font * 1.5}px`}
                    fontWeight={700}
                    color={color}
                    // Truncate text
                    width={`${
                      dimensions.width -
                      dimensions.image -
                      dimensions.padding * 2
                    }px`}
                    whiteSpace={'nowrap'}
                    textOverflow={'ellipsis'}
                    flexShrink={0}
                  >
                    {title}
                  </Text>
                )}

                {hasLine && title && (
                  <Box
                    bg={color}
                    h={hasLine ? `${dimensions.font / 6}px` : '0'}
                    w={'full'}
                    rounded={`${dimensions.font / 6}px`}
                  />
                )}

                <Text
                  fontSize={`${dimensions.font}px`}
                  overflow={'hidden'}
                  whiteSpace={'pre-wrap'}
                  flexGrow={1}
                  alignItems={'center'}
                >
                  {text}
                </Text>
              </Stack>
            </Flex>
          ) : (
            <Skeleton />
          )}
        </Flex>
      </AspectRatio>
    )
  },
)
