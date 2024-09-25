import { FC } from 'react'

import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import { i18nConfig } from '@fc/config/next-i18next.config'
import { Providers } from '@fc/ui/components/Providers'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers site="lotus" dehydratedState={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </Providers>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
