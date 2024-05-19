import dynamic from 'next/dynamic'

export const SubToNotification = dynamic(() => import('./SubToNotification'), {
  ssr: false,
})
