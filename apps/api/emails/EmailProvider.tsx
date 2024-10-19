import React, { FC, PropsWithChildren } from 'react'

import { Site } from '@fc/types'
import { Body, Font, Html } from '@react-email/components'
import SiteLayout from './components/SiteLayout'

type EmailProviderProps = PropsWithChildren<{
  site: Site
  preview: string
  heading: string
}>

export const EmailProvider: FC<EmailProviderProps> = ({
  children,
  site,
  preview,
  heading,
}) => {
  return (
    <Html>
      <Font
        fontFamily="Poppins"
        fallbackFontFamily="Arial"
        fontWeight={400}
        fontStyle="normal"
        webFont={{
          url: 'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2',
          format: 'woff2',
        }}
      />
      <Font
        fontFamily="Poppins"
        fallbackFontFamily="Arial"
        fontWeight={600}
        fontStyle="normal"
        webFont={{
          url: 'https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmr19VGdeOYktMqlap.woff2',
          format: 'woff2',
        }}
      />
      <Body>
        <SiteLayout site={site} preview={preview} heading={heading}>
          {children}
        </SiteLayout>
      </Body>
    </Html>
  )
}
