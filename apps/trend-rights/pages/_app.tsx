import { FC } from 'react'

import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import { i18nConfig } from '@fc/config'
import { Providers } from '@fc/ui'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers
      appSlug="trend-rights"
      enablePush
      dehydratedState={pageProps.dehydratedState}
    >
      <Component {...pageProps} />
    </Providers>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
