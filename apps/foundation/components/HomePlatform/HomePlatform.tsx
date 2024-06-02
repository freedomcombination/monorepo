import { FC } from 'react'

import { Box, Center, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Platform, PlatformSlug } from '@fc/types'
import { AnimatedBox, ButtonLink, Container, WImage } from '@fc/ui'

type HomePlatformProps = {
  platforms: Platform[]
}

const colors: Record<
  PlatformSlug,
  { bg: string; colorScheme: string; text: string }
> = {
  lotus: { bg: 'black', colorScheme: 'yellow', text: 'white' },
  'trend-rights': {
    bg: 'trend-rights.100',
    colorScheme: 'trend-rights',
    text: 'initial',
  },
  kunsthalte: { bg: 'green.100', colorScheme: 'green', text: 'initial' },
  academy: { bg: 'blue.100', colorScheme: 'blue', text: 'initial' },
  'rhythmic-dreams': { bg: 'red.100', colorScheme: 'red', text: 'initial' },
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
                <AnimatedBox
                  order={{ base: 1, lg: index % 2 ? 2 : 1 }}
                  w="max-content"
                  directing={index % 2 ? 'to-left' : 'to-right'}
                >
                  <WImage
                    src={platform.image}
                    boxSize={200}
                    alt={platform[`name_${locale}`]}
                  />
                </AnimatedBox>
                <AnimatedBox
                  directing={index % 2 ? 'to-right' : 'to-left'}
                  order={{ base: 2, lg: index % 2 ? 1 : 2 }}
                >
                  <Stack
                    spacing={4}
                    textAlign={{
                      base: 'center',
                      lg: index % 2 ? 'right' : 'left',
                    }}
                  >
                    <Heading
                      size="lg"
                      fontWeight={900}
                      colorScheme={color.colorScheme}
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
                      colorScheme={color.colorScheme}
                      variant="link"
                      alignSelf={index % 2 ? 'flex-end' : 'flex-start'}
                      fontWeight={700}
                    >
                      {t('read-more')}
                    </ButtonLink>
                  </Stack>
                </AnimatedBox>
              </SimpleGrid>
            </Container>
          </Center>
        )
      })}
    </Box>
  )
}
