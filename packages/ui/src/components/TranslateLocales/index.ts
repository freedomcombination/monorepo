import dynamic from 'next/dynamic'

export const TranslateLocales = dynamic(() => import('./TranslateLocales'), {
  ssr: false,
})
