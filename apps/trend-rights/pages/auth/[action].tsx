import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { AuthActionForm, LoginStates, getTitle } from '@fc/ui'

import { Layout } from '../../components'

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
