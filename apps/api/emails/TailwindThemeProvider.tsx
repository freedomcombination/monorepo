import React, { FC, PropsWithChildren } from 'react'

import { theme } from '@chakra-ui/react'
import { Font, Html, Tailwind } from '@react-email/components'

const colors = theme.colors

export const TailwindThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Tailwind config={{ theme: { extend: { colors } } }}>
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
        {children}
      </Html>
    </Tailwind>
  )
}
