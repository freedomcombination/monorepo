import { FC, ReactNode, useState } from 'react'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
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
import { ThemeProvider } from 'next-themes'
import { useCookie } from 'react-use'

import { RECAPTCHA_SITE_KEY, defaultSeo } from '@fc/config'
import { AuthProvider, WebPushProvider } from '@fc/context'
import { Site } from '@fc/types'

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
  const [cookie, updateCookie] = useCookie('__CB-ALLOWED')

  const onAllow = () => {
    updateCookie('true')
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
              <ChakraProvider value={defaultSystem}>
                <ThemeProvider attribute="class" disableTransitionOnChange>
                  {enable && <NotificationModal />}
                  {children}
                  {!cookie && <CookieBanner onAllow={onAllow} />}
                  {/* <ToastContainer /> */}
                </ThemeProvider>
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
