import dynamic from 'next/dynamic'

export const ExportPDF = dynamic(() => import('./ExportPDF'), { ssr: false })
