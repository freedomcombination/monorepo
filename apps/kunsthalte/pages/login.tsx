import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { LoginForm } from '@wsvvrijheid/ui'

import { Layout } from '../components'

type LoginPageProps = InferGetStaticPropsType<typeof getStaticProps>

const LoginPage: FC<LoginPageProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <LoginForm providersToBeShown={['google']} />
      </Box>
    </Layout>
  )
}

export default LoginPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Login',
    tr: 'Giriş',
    nl: 'Login',
  }

  const description = {
    en: '',
    tr: '',
    nl: '',
  }
  const seo = {
    title: title[locale],
    description: description[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
