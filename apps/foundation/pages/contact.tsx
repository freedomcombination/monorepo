import {
  Box,
  Separator,
  Heading,
  SimpleGrid,
  VStack,
  Group,
} from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

import { socialLinks } from '@fc/config'
import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Foundation, StrapiLocale } from '@fc/types'
import { ButtonLink, ContactForm, Container, SocialButtons } from '@fc/ui'

import { Layout } from '../components'

type ContactProps = InferGetStaticPropsType<typeof getStaticProps>

const Contact = ({ foundation }: ContactProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Layout seo={{ title: t('contact.title') }}>
      <Box minH="inherit" fontWeight={500}>
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
                Freedom Combination <br /> Foundation
              </Heading>
              <Separator borderColor="whiteAlpha.400" />

              <Group
                wrap={'wrap'}
                gap={4}
                justify="center"
                key={foundation?.id}
              >
                <ButtonLink
                  isExternal
                  variant="plain"
                  color="primary.50"
                  _hover={{ color: 'primary.100' }}
                  leftIcon={<Box as={MdPhone} color="primary.50" size="20px" />}
                  href={`tel:${foundation?.contact?.phone}`}
                >
                  {foundation?.contact?.phone}
                </ButtonLink>

                <ButtonLink
                  isExternal
                  variant="plain"
                  color="primary.50"
                  _hover={{ color: 'primary.50' }}
                  leftIcon={
                    <Box as={MdEmail} color="primary.100" boxSize="20px" />
                  }
                  href={`mailto:${foundation?.contact?.email}`}
                >
                  {foundation?.contact?.email}
                </ButtonLink>
                <ButtonLink
                  isExternal
                  variant="plain"
                  color="primary.50"
                  _hover={{ color: 'primary.100' }}
                  leftIcon={
                    <Box as={MdLocationOn} color="primary.50" boxSize="20px" />
                  }
                  href="https://goo.gl/maps/E9HaayQnXmphUWtN8"
                  textAlign="left"
                >
                  {foundation?.contact?.address}
                </ButtonLink>
              </Group>

              <SocialButtons items={socialLinks.foundation} />
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

  const foundations = await strapiRequest<Foundation>({
    endpoint: 'foundations',
  })

  const foundation = foundations?.data?.[0]

  if (!foundation) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      foundation,
    },
    revalidate: 1,
  }
}

export default Contact
