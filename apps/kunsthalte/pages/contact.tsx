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
import { useTranslation } from 'next-i18next'
import { MdEmail } from 'react-icons/md'

import { EMAIL_SENDER, RecaptchaKeys, socialLinks } from '@fc/config'
import { PUBLIC_TOKEN } from '@fc/config'
import { sendEmail, useRecaptchaToken } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { EmailCreateInput, StrapiLocale } from '@fc/types'
import {
  ContactForm,
  ContactFormFieldValues,
  Container,
  SocialButtons,
} from '@fc/ui'

import { Layout } from '../components'

const Contact = () => {
  const { t } = useTranslation()
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.CONTACT_FORM)

  const {
    isError,
    isPending,
    isSuccess,
    mutate: sendForm,
  } = useMutation({
    mutationKey: ['contact'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(
        data,
        PUBLIC_TOKEN as string,
        recaptchaToken ?? 'some fake token',
      )
      // if we send an undefined token, sendMail ll send mail successfully
      // so we force this function to use custom route with fake token.
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
              <Text>{t('about.content')}</Text>

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
