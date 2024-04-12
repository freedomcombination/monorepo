import {
  Box,
  Button,
  Divider,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MdEmail } from 'react-icons/md'

import { EMAIL_SENDER, socialLinks } from '@fc/config'
import { PUBLIC_TOKEN } from '@fc/config'
import { sendEmail } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { EmailCreateInput, StrapiLocale } from '@fc/types'
import {
  ContactForm,
  ContactFormFieldValues,
  Container,
  SocialButtons,
} from '@fc/ui'

import { Layout } from '../components'

// TODO: Move to translations
const about = {
  tr: `Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.`,
  en: `Art Station is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.`,
  nl: `Kunsthalte is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.`,
}

const Contact = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const {
    isError,
    isPending,
    isSuccess,
    mutate: sendForm,
  } = useMutation({
    mutationKey: ['contact'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(data, PUBLIC_TOKEN as string)
    },
  })

  const handleSubmit = async (data: ContactFormFieldValues) => {
    const emailData = {
      subject: `Form from ${data.fullname} (${data.email})`,
      text: data.message,
      from: EMAIL_SENDER,
    }

    return sendForm(emailData)
  }

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
              spacing={8}
            >
              <Heading fontWeight={900} as="h2" size="lg" color="primary.50">
                {t('art-stop')}
              </Heading>
              <Text>{about[locale]}</Text>

              <Divider borderColor="whiteAlpha.400" />

              <Button
                as={Link}
                isExternal
                variant="link"
                color="primary.50"
                _hover={{ color: 'primary.100' }}
                leftIcon={<Box as={MdEmail} color="primary.50" size="20px" />}
                href="mailto:kunsthalte@freedomcombination.com"
              >
                kunsthalte@freedomcombination.com
              </Button>

              <SocialButtons items={socialLinks.kunsthalte} />
            </VStack>

            <ContactForm
              onSubmitHandler={handleSubmit}
              isLoading={isPending}
              isSuccess={isSuccess}
              isError={isError}
            />
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
