import dynamic from 'next/dynamic'

export * from './types'

export const CollectionBook = dynamic(() => import('./CollectionBook'), {
  ssr: false,
})
