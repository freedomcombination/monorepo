import React, { FC } from 'react'

import { Heading, Section, Text } from '@react-email/components'

import { Site, StrapiLocale } from '@fc/types'

import { EmailButton } from './components/Button'
import SiteLayout from './components/SiteLayout'
import { EmailProvider } from './EmailProvider'
import { getSiteColor, getSiteLink } from './utils/getSiteData'
import { getTranslate } from './utils/getTranslate'

type ForgotPasswordProps = {
  email: string
  site: Site
  locale: StrapiLocale
  code: string
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
  site = 'dashboard',
  locale = 'en',
  code = '123',
}) => {
  const resetLink = getSiteLink(site, locale) + 'auth/reset?code=' + code
  const { t } = getTranslate(locale)
  const color = getSiteColor(site)

  return (
    <EmailProvider>
      <SiteLayout site={site} preview={t('forgot.preview')}>
        <Section>
          <Heading className="leading-tight">{t('forgot.heading')}</Heading>
          <Text>{t('forgot.message')}</Text>
          <EmailButton style={{ backgroundColor: color }} href={resetLink}>
            {t('forgot.reset')}
          </EmailButton>
        </Section>
      </SiteLayout>
    </EmailProvider>
  )
}

export default ForgotPassword
