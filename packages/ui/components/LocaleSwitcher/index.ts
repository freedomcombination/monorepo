import dynamic from 'next/dynamic'

export * from './types'

export const LocaleSwitcher = dynamic(() => import('./LocaleSwitcher'), {
  ssr: false,
})
