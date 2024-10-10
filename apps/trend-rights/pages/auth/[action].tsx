import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import {
  AuthActionForm,
  getTitle,
  LoginStates,
} from '@fc/ui/components/AuthActionForm'

import { Layout } from '../../components/Layout'

const AuthPage: FC<{ action: LoginStates }> = ({ action }) => {
  const { t } = useTranslation()

  const title = t(getTitle(action))

  return (
    <Layout seo={{ title }}>
      <Box minH="inherit">
        <AuthActionForm action={action} />
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  action: string
}> = async context => {
  const locale = context.locale as StrapiLocale
  const { action } = context.params as { action: LoginStates }

  return {
    props: {
      action: action ?? 'login',
      ...(await ssrTranslations(locale)),
    },
  }
}

export default AuthPage
