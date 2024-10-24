import { FC, ReactNode, useState } from 'react'

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

import { RECAPTCHA_SITE_KEY } from '@fc/config/constants'
import { defaultSeo } from '@fc/config/seo'
import { themes } from '@fc/config/theme'
import { AuthProvider } from '@fc/context/auth'
import { WebPushProvider } from '@fc/context/webPush'
import { CookieKey, type Site } from '@fc/types'

import { CookieBanner } from '../CookieBanner'
import { NotificationModal } from '../NotificationModal'

type ProvidersProps = {
  site: Site
  children: ReactNode
  dehydratedState: unknown
  enablePush?: boolean
}

const { ToastContainer } = createStandaloneToast()

export const Providers: FC<ProvidersProps> = ({
  site,
  children,
  dehydratedState,
  enablePush = false,
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
  const [bannerCookie, updateBannerCookie] = useCookie(
    CookieKey.COOKIE_BANNER_ALLOWED,
  )

  const onAllow = () => {
    updateBannerCookie('true')
  }

  const enable =
    enablePush && process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true'

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <AuthProvider site={site}>
          <ChakraProvider theme={themes[site]}>
            <ReCaptchaProvider
              reCaptchaKey={RECAPTCHA_SITE_KEY}
              language={locale}
            >
              <WebPushProvider enable={enable}>
                {enable && <NotificationModal />}
                <DefaultSeo {...defaultSeo[site][locale]} />
                {children}
                {process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' && (
                  <Analytics />
                )}
                {!bannerCookie && <CookieBanner onAllow={onAllow} />}
                <ToastContainer />
              </WebPushProvider>
            </ReCaptchaProvider>
          </ChakraProvider>
        </AuthProvider>
      </HydrationBoundary>
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  )
}
