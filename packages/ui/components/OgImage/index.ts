import dynamic from 'next/dynamic'

const OgImage = dynamic(() => import('./OgImage'), {
  ssr: false,
})

export { OgImage }
