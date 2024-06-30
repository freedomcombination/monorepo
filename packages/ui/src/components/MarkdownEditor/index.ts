import dynamic from 'next/dynamic'

export const MarkdownEditor = dynamic(() => import('./MarkdownEditor'), {
  ssr: false,
})
