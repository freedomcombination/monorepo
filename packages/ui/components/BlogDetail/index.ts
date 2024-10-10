import dynamic from 'next/dynamic'

export const BlogDetail = dynamic(() => import('./BlogDetail'), { ssr: false })
