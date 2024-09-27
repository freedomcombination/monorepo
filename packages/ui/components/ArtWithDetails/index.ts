import dynamic from 'next/dynamic'

export const ArtWithDetails = dynamic(() => import('./ArtWithDetails'), {
  ssr: false,
})
