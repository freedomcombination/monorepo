import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { AdminLoginForm } from '@fc/ui/components/AdminLoginForm'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo title={t('login.signin')} />
      <Box minH="inherit" h="full">
        <AdminLoginForm />
      </Box>
    </>
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

export default LoginPage
