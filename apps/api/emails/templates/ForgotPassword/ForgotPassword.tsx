import type { Site, StrapiLocale } from '@fc/types'
import { Text } from '@react-email/components'
import React, { FC } from 'react'
import { EmailProvider } from '../../EmailProvider'
import { EmailButton } from '../../components/Button'
import { getSiteColor, getSiteLink } from '../../utils/getSiteData'
import { getTranslate, TranslateFunc } from '../../utils/getTranslate'

type ForgotPasswordProps = {
  email: string
  site: Site
  t: TranslateFunc
  code: string
}

const ForgotPassword: FC<ForgotPasswordProps> = ({
  site = 'trend-rights',
  t = getTranslate('en').t,
  code = 'random-email-reset-code',
}) => {
  const locale = t() as StrapiLocale
  const resetLink = getSiteLink(site, locale) + 'auth/reset?code=' + code
  const color = getSiteColor(site)

  return (
    <EmailProvider
      site={site}
      preview={t('forgot.preview')}
      heading={t('forgot.heading')}
    >
      <Text style={{ marginTop: 40, marginBottom: 40 }}>
        {t('forgot.message')}
      </Text>
      <EmailButton style={{ backgroundColor: color }} href={resetLink}>
        {t('forgot.reset')}
      </EmailButton>
    </EmailProvider>
  )
}

export default ForgotPassword
