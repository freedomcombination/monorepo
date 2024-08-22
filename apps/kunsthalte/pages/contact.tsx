import {
  Box,
  Separator,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { MdEmail } from 'react-icons/md'

import { socialLinks } from '@fc/config'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { ButtonLink, ContactForm, Container, SocialButtons } from '@fc/ui'

import { Layout } from '../components'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('contact.title') }}>
      <Box minH="inherit">
        <Container minH="inherit">
          <SimpleGrid
            my={{ base: 8, lg: 0 }}
            gap={8}
            alignContent="center"
            columns={{ base: 1, lg: 2 }}
            minH="inherit"
          >
            <VStack
              bgGradient={'linear(to-b, primary.400, primary.500)'}
              color="primary.50"
              borderRadius="lg"
              p={{ base: 8, lg: 12 }}
              textAlign="center"
              justify="space-evenly"
              gap={8}
            >
              <Heading fontWeight={900} as="h2" size="lg" color="primary.50">
                {t('art-stop')}
              </Heading>
              <Text>{t('about.content')}</Text>

              <Separator borderColor="whiteAlpha.400" />

              <ButtonLink
                isExternal
                variant="plain"
                color="primary.50"
                _hover={{ color: 'primary.100' }}
                leftIcon={
                  <Box as={MdEmail} color="primary.50" fontSize="20px" />
                }
                href="mailto:kunsthalte@freedomcombination.com"
              >
                kunsthalte@freedomcombination.com
              </ButtonLink>

              <SocialButtons items={socialLinks.kunsthalte} />
            </VStack>

            <ContactForm />
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default Contact
