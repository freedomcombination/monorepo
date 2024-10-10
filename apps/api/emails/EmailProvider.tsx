import React, { FC, PropsWithChildren } from 'react'

import { Body, Container, Font, Html } from '@react-email/components'

export const EmailProvider: FC<PropsWithChildren> = ({ children }) => {
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
        <Container style={{ maxWidth: '80%' }}>{children}</Container>
      </Body>
    </Html>
  )
}
