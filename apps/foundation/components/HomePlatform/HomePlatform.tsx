import { FC } from 'react'

import { Box, Center, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Platform, PlatformSlug } from '@fc/types'
import { ButtonLink, Container, WImage } from '@fc/ui'

type HomePlatformProps = {
  platforms: Platform[]
}

const colors: Record<
  PlatformSlug,
  { bg: string; colorPalette: string; text: string }
> = {
  lotus: { bg: 'black', colorPalette: 'yellow', text: 'white' },
  'trend-rights': {
    bg: 'trend-rights.100',
    colorPalette: 'trend-rights',
    text: 'initial',
  },
  kunsthalte: { bg: 'green.100', colorPalette: 'green', text: 'initial' },
  academy: { bg: 'blue.100', colorPalette: 'blue', text: 'initial' },
  'rhythmic-dreams': { bg: 'red.100', colorPalette: 'red', text: 'initial' },
}

export const HomePlatform: FC<HomePlatformProps> = ({ platforms }) => {
  const router = useRouter()
  const locale = router.locale

  const { t } = useTranslation()

  return (
    <Box>
      {platforms.map((platform, index) => {
        const color = colors[platform.slug as PlatformSlug] || colors.academy

        return (
          <Center
            key={index}
            py={{ base: 16, lg: 32 }}
            minH={{ base: '100vh', lg: '50vh' }}
            bg={color.bg}
          >
            <Container>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                justifyItems="center"
                gap={8}
              >
                <Box order={{ base: 1, lg: index % 2 ? 2 : 1 }} w="max-content">
                  <WImage
                    src={platform.image}
                    boxSize={200}
                    alt={platform[`name_${locale}`]}
                  />
                </Box>
                <Box order={{ base: 2, lg: index % 2 ? 1 : 2 }}>
                  <Stack
                    gap={4}
                    textAlign={{
                      base: 'center',
                      lg: index % 2 ? 'right' : 'left',
                    }}
                  >
                    <Heading
                      size="lg"
                      fontWeight={900}
                      colorPalette={color.colorPalette}
                    >
                      {platform[`name_${locale}`]}
                    </Heading>
                    <Text color={color.text}>
                      {platform[`description_${locale}`]}
                    </Text>
                    <ButtonLink
                      href={`/platforms/${platform.slug}`}
                      w="max-content"
                      size="lg"
                      colorPalette={color.colorPalette}
                      variant="plain"
                      alignSelf={index % 2 ? 'flex-end' : 'flex-start'}
                      fontWeight={700}
                    >
                      {t('read-more')}
                    </ButtonLink>
                  </Stack>
                </Box>
              </SimpleGrid>
            </Container>
          </Center>
        )
      })}
    </Box>
  )
}
