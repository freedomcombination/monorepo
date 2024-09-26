import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { ForgotPasswordForm } from '@fc/ui/components/ForgotPasswordForm'
import { LoginForm } from '@fc/ui/components/LoginForm'
import { ResetPasswordForm } from '@fc/ui/components/ResetPasswordForm'
import { SignupForm } from '@fc/ui/components/SignupForm'

import { Layout } from '../../components/Layout'

type LoginStates = 'login' | 'register' | 'forgot' | 'reset' | 'forgot-password'

const AuthPage: FC<{ action: LoginStates }> = ({ action }) => {
  const { t } = useTranslation()

  const title = () => {
    switch (action) {
      case 'reset':
        return t('forgot-pass.reset-password')
      case 'register':
        return t('login.signup')
      case 'forgot-password':
      case 'forgot':
        return t('login.forgot.title')
      default:
        return t('login.signin')
    }
  }

  const getForm = () => {
    switch (action) {
      case 'forgot-password':
      case 'forgot':
        return <ForgotPasswordForm />
      case 'reset':
        return <ResetPasswordForm />
      case 'register':
        return <SignupForm providersToBeShown={[]} />
      default:
        return <LoginForm providersToBeShown={[]} />
    }
  }

  return (
    <Layout seo={{ title: title() }}>
      <Box minH="inherit">{getForm()}</Box>
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
