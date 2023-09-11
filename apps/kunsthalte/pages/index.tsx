import { Button, Center, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { BsActivity, BsCollectionFill } from 'react-icons/bs'
import { FaPaintBrush } from 'react-icons/fa'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AnimatedBox, Container, Navigate } from '@wsvvrijheid/ui'

import { Layout } from '../components'

const Home = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Layout seo={{ title: t('home') }}>
      <Center
        minH="100vh"
        bg="gray.100"
        mt={{ base: '-64px', lg: '-100px' }}
        pt={100}
        pos="relative"
        zIndex={0}
        backgroundImage={`url(/images/kunsthalte-home.jpeg)`}
        backgroundSize="cover"
      >
        <Container
          maxW="container.md"
          pos="relative"
          zIndex={1}
          transform={{ base: 'translateY(-50px)', lg: 'translateY(-120px)' }}
        >
          <AnimatedBox directing="to-down">
            <VStack flex={1} py={16} spacing={4} textAlign="center">
              <Heading fontWeight={900}>{t('art-stop')}</Heading>
              <Text fontSize={{ base: 'md', lg: 'xl' }}>
                &quot;<>{t('footer-about.kunsthalte')}</>&quot;
              </Text>
            </VStack>
          </AnimatedBox>
          <AnimatedBox directing="to-down" mx="auto">
            <Stack
              justify="center"
              direction={{ base: 'column', lg: 'row' }}
              spacing={4}
            >
              <Button
                as={Navigate}
                href={`/${locale}/club/arts`}
                size="lg"
                leftIcon={<FaPaintBrush />}
              >
                {t('view-arts')}
              </Button>

              <Button
                as={Navigate}
                href={`/${locale}/club/collections`}
                size="lg"
                leftIcon={<BsCollectionFill />}
              >
                {t('view-collections')}
              </Button>
              <Button
                as={Navigate}
                href={`/${locale}/activities`}
                size="lg"
                leftIcon={<BsActivity />}
              >
                {t('view-activities')}
              </Button>
            </Stack>
          </AnimatedBox>
        </Container>
      </Center>
    </Layout>
  )
}

export default Home

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
