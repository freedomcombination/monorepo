import { AppSlug, StrapiLocale } from '@fc/types'
import { Button, Heading, Section, Text } from '@react-email/components'
import React, { FC } from 'react'
import { EmailProvider } from './EmailProvider'
import PlatformLayout from './components/PlatformLayout'
import { getLinkByAppSlug } from './utils/getByAppSlug'
import { getTranslate } from './utils/getTranslate'

type ForgotPasswordProps = {
  email: string
  platform: AppSlug
  locale?: StrapiLocale
  code: string
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
  platform,
  locale,
  code,
}) => {
  const resetLink =
    getLinkByAppSlug(platform as AppSlug, locale) + 'auth/reset?code=' + code
  const { t } = getTranslate(locale)

  return (
    <EmailProvider>
      <PlatformLayout appSlug={platform} preview={t('forgot.preview')}>
        <Section>
          <Heading>{t('forgot.heading')}</Heading>
          <Text>{t('forgot.message')}</Text>
          <Button href={resetLink}>{t('forgot.reset')}</Button>
        </Section>
      </PlatformLayout>
    </EmailProvider>
  )
}

export default ForgotPassword
