import { Site, StrapiLocale } from '@fc/types'
import { Button, Heading, Section, Text } from '@react-email/components'
import React, { FC } from 'react'
import { EmailProvider } from './EmailProvider'
import PlatformLayout from './components/PlatformLayout'
import { getSiteLink } from './utils/getSiteData'
import { getTranslate } from './utils/getTranslate'

type ForgotPasswordProps = {
  email: string
  site: Site
  locale?: StrapiLocale
  code: string
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ site, locale, code }) => {
  const resetLink = getSiteLink(site, locale) + 'auth/reset?code=' + code
  const { t } = getTranslate(locale)

  return (
    <EmailProvider>
      <PlatformLayout site={site} preview={t('forgot.preview')}>
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
