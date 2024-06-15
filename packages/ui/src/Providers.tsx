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
import { AuthProvider, WebPushProvider } from '@fc/context'
import { AppSlug } from '@fc/types'

import { CookieBanner, NotificationModal } from './components'

type ProvidersProps = {
  appSlug: AppSlug
  children: ReactNode
  dehydratedState: unknown
  enablePush?: boolean
}

const { ToastContainer } = createStandaloneToast()

export const Providers: FC<ProvidersProps> = ({
  appSlug,
  children,
  dehydratedState,
  enablePush,
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
          <AuthProvider appSlug={appSlug}>
            <ChakraProvider theme={themes[appSlug]}>
              <ReCaptchaProvider
                reCaptchaKey={RECAPTCHA_SITE_KEY}
                language={locale}
              >
                <WebPushProvider enable={!!enablePush}>
                  {enablePush && <NotificationModal />}
                  <DefaultSeo {...defaultSeo[appSlug][locale]} />
                  {children}
                  <Analytics />
                  {!cookie && <CookieBanner onAllow={onAllow} />}
                  <ToastContainer />
                </WebPushProvider>
              </ReCaptchaProvider>
            </ChakraProvider>
          </AuthProvider>
        </HydrationBoundary>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </HydrationOverlay>
  )
}
