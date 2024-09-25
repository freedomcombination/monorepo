import dynamic from 'next/dynamic'

export const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  ssr: false,
})
