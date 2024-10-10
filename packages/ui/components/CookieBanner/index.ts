import dynamic from 'next/dynamic'

export const CookieBanner = dynamic(() => import('./CookieBanner'), {
  ssr: false,
})
