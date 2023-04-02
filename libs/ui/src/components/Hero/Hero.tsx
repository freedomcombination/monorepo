import { FC, memo, PropsWithChildren } from 'react'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'

import { API_URL } from '@wsvvrijheid/config'
import { UploadFile } from '@wsvvrijheid/types'

import { Container } from '../Container'
import { WImage } from '../WImage'

export interface HeroProps {
  title?: string
  description?: string
  video?: string
  image?: UploadFile | string
  isFullHeight?: boolean
}

export const Hero: FC<PropsWithChildren<HeroProps>> = memo(function Hero({
  title,
  description,
  video,
  image = `${API_URL}/uploads/human_rights_752e221112.webp`,
  isFullHeight = false,
  children,
}) {
  return (
    <Box
      className="hero"
      pos="relative"
      height={isFullHeight ? '100vh' : '300px'}
      marginTop={{ base: '-64px', lg: '-100px' }}
    >
      {video && (
        <Box
          as="video"
          top={0}
          left={0}
          w="full"
          h="full"
          objectFit="cover"
          autoPlay
          loop
          position="absolute"
        >
          <source src={video} type="video/webm" />
        </Box>
      )}
      {image && (
        <Box
          className="hero_image"
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
        >
          <WImage
            src={image}
            objectFit="cover"
            objectPosition="bottom"
            alt={title}
          />
        </Box>
      )}
      <Box
        className="hero_blender"
        pos="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bg="blackAlpha.600"
        blendMode="multiply"
      />
      <Container h="full">
        <VStack
          position="relative"
          spacing={8}
          py={8}
          h="full"
          justify="end"
          maxW={900}
          mx="auto"
          textAlign="center"
        >
          {title && (
            <Heading
              color="white"
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              {...(!isFullHeight && {
                pos: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                w: 'full',
              })}
            >
              {title}
            </Heading>
          )}
          {description && (
            <Text
              color="white"
              fontSize="lg"
              display={isFullHeight ? 'inherit' : 'none'}
            >
              {description}
            </Text>
          )}
          {children}
        </VStack>
      </Container>
    </Box>
  )
})
