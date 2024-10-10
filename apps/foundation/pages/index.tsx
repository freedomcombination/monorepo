import { FC } from 'react'

import { Box, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Platform, StrapiLocale } from '@fc/types'
import { AnimatedBox } from '@fc/ui/components/AnimatedBox'
import { Container } from '@fc/ui/components/Container'

import { HomeAbout, HomeHero, HomePlatform, Layout } from '../components'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: FC<HomeProps> = ({ platforms }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('home') }}>
      <Flex
        flexDir="column"
        justify="space-between"
        minH="100vh"
        bg="gray.100"
        mt={{ base: '-64px', lg: -100 }}
        pt={100}
        pos="relative"
        zIndex={0}
      >
        <Container maxW="container.md" pos="relative" zIndex={1}>
          <AnimatedBox directing="to-down">
            <VStack flex={1} py={16} spacing={4} textAlign="center">
              <Heading fontWeight={900}>Freedom Combination</Heading>
              <Text fontSize="xl">{t('home.hero')}</Text>
            </VStack>
          </AnimatedBox>
        </Container>
        <Box overflow="hidden" mt={{ base: '-64px', lg: -100 }}>
          <AnimatedBox delay={4} duration={3} directing="to-up">
            <HomeHero />
          </AnimatedBox>
        </Box>
      </Flex>
      <Center bg="primary.100" py={{ base: 16, lg: 32 }} minH="100vh">
        <Container>
          <HomeAbout />
        </Container>
      </Center>
      <HomePlatform platforms={platforms?.data} />
    </Layout>
  )
}

export default Home

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const platforms = await strapiRequest<Platform>({
    endpoint: 'platforms',
  })

  return {
    props: {
      platforms,
      ...(await ssrTranslations(locale)),
    },
  }
}
