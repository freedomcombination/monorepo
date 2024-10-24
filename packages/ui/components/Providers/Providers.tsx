import { FC, ReactNode, useState } from 'react'

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

import { ChakraProvider, Toaster } from '@fc/chakra'
import { RECAPTCHA_SITE_KEY } from '@fc/config/constants'
import { defaultSeo } from '@fc/config/seo'
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
          <ReCaptchaProvider
            reCaptchaKey={RECAPTCHA_SITE_KEY}
            language={locale}
          >
            <WebPushProvider enable={enable}>
              <DefaultSeo {...defaultSeo[site][locale]} />
              <ChakraProvider site={site}>
                {enable && <NotificationModal />}
                {children}
                {process.env.VERCEL_ENV === 'production' && <Analytics />}
                {!bannerCookie && <CookieBanner onAllow={onAllow} />}
                <Toaster />
              </ChakraProvider>
            </WebPushProvider>
          </ReCaptchaProvider>
        </AuthProvider>
      </HydrationBoundary>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <Analytics />
    </QueryClientProvider>
  )
}
