import dynamic from 'next/dynamic'

export * from './types'

export const FormattedDate = dynamic(() => import('./FormattedDate'), {
  ssr: false,
})
