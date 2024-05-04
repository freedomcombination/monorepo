import { FC, ReactNode, useState } from 'react'

import { HydrationOverlay } from '@builder.io/react-hydration-overlay'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { DefaultSeo } from 'next-seo'
import { useCookie } from 'react-use'

import { RECAPTCHA_SITE_KEY, defaultSeo, themes } from '@fc/config'
import { AuthProvider } from '@fc/context'
import { AppSlug } from '@fc/types'

import { CookieBanner } from './components'

type ProvidersProps = {
  dehydratedState: unknown
  appSlug: AppSlug
  children: ReactNode
}

const { ToastContainer } = createStandaloneToast()

export const Providers: FC<ProvidersProps> = ({
  dehydratedState,
  appSlug,
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { networkMode: 'always' },
          queries: { networkMode: 'always' },
        },
      }),
  )

  const { locale } = useRouter()
  const [cookie, updateCookie] = useCookie('__CB-ALLOWED')

  const onAllow = () => {
    updateCookie('true')
  }

  return (
    <HydrationOverlay>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <AuthProvider>
            <ChakraProvider theme={themes[appSlug]}>
              <ReCaptchaProvider
                reCaptchaKey={RECAPTCHA_SITE_KEY}
                language={locale}
              >
                <DefaultSeo {...defaultSeo[appSlug][locale]} />
                {children}
                <Analytics />
                {!cookie && <CookieBanner onAllow={onAllow} />}
                <ToastContainer />
              </ReCaptchaProvider>
            </ChakraProvider>
          </AuthProvider>
        </HydrationBoundary>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </HydrationOverlay>
  )
}
