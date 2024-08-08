import { Site, StrapiLocale } from '@fc/types'
import { Heading, Section, Text } from '@react-email/components'
import React, { FC } from 'react'
import { EmailProvider } from './EmailProvider'
import SiteLayout from './components/SiteLayout'
import { getSiteColor, getSiteLink } from './utils/getSiteData'
import { getTranslate } from './utils/getTranslate'
import { EmailButton } from './components/Button'

type ForgotPasswordProps = {
  email: string
  site: Site
  locale?: StrapiLocale
  code: string
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ site, locale, code }) => {
  const resetLink = getSiteLink(site, locale) + 'auth/reset?code=' + code
  const { t } = getTranslate(locale)
  const color = getSiteColor(site)

  return (
    <EmailProvider>
      <SiteLayout site={site} preview={t('forgot.preview')}>
        <Section style={{ padding: '20px' }}>
          <Heading>{t('forgot.heading')}</Heading>
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
