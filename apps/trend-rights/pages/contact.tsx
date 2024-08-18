import { Box, Heading, Stack, VStack } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

import { EMAIL, socialLinks } from '@fc/config'
import { useSendEmail } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import {
  ButtonLink,
  ContactForm,
  ContactFormFieldValues,
  Container,
  SocialButtons,
} from '@fc/ui'

import { Layout } from '../components'

const Contact = () => {
  const { t } = useTranslation()

  const { isError, isPending, isSuccess, mutate: sendForm } = useSendEmail()

  const handleSubmit = async (data: ContactFormFieldValues) => {
    const emailData = {
      subject: `Form from ${data.fullname} (${data.email})`,
      text: data.message,
      from: EMAIL,
    }

    return sendForm(emailData)
  }

  return (
    <Layout seo={{ title: t('contact.title') }}>
      <Box minH="inherit">
        <Container minH="inherit" maxW="container.xl">
          <Stack
            justify="center"
            align="center"
            gap={8}
            direction={{ base: 'column', lg: 'row' }}
            minH="inherit"
          >
            <VStack
              bgGradient={'linear(to-b, primary.400, primary.500)'}
              borderRadius="lg"
              p={{ base: 8, lg: 16 }}
              w={'full'}
              textAlign="center"
              justify="center"
              gap={{ base: 8, lg: 16 }}
            >
              <Heading color={'primary.50'}>{t('trend-rights')}</Heading>
              <VStack alignItems="flex-start" color="primary.50">
                <ButtonLink
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  color={'white'}
                  _hover={{ borderColor: 'primary.50' }}
                  leftIcon={<Box as={MdPhone} color="primary.50" size="20px" />}
                  href="tel:+31685221308"
                >
                  +31-6 85221308
                </ButtonLink>
                <ButtonLink
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  color={'white'}
                  _hover={{ borderColor: 'primary.50' }}
                  leftIcon={
                    <Box as={FaWhatsapp} color="primary.50" size="20px" />
                  }
                  href="https://api.whatsapp.com/send?phone=31685221308"
                >
                  {t('contact.form.message')}
                </ButtonLink>
                <ButtonLink
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  color={'white'}
                  _hover={{ borderColor: 'primary.50' }}
                  leftIcon={<Box as={MdEmail} color="primary.50" size="20px" />}
                  href="mailto:info@trendrights.com"
                >
                  info@trendrights.com
                </ButtonLink>
                <ButtonLink
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  color={'white'}
                  _hover={{ borderColor: 'primary.50' }}
                  leftIcon={
                    <Box as={MdLocationOn} color="primary.50" size="20px" />
                  }
                  href="https://goo.gl/maps/E9HaayQnXmphUWtN8"
                >
                  Tandersplein 1, 3027 CN <br /> Rotterdam, Netherland
                </ButtonLink>
              </VStack>

              <SocialButtons items={socialLinks['trend-rights']} />
            </VStack>

            <Box w="full">
              <ContactForm
                onSubmitHandler={handleSubmit}
                loading={isPending}
                isSuccess={isSuccess}
                isError={isError}
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}
export default Contact

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
