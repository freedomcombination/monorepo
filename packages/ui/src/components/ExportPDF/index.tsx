import dynamic from 'next/dynamic'

import { StrapiModel } from '@fc/types'

import { ExportPDFProps } from './types'

export const ExportPDF = dynamic(() => import('./ExportPDF'), {
  ssr: false,
}) as <T extends StrapiModel>(props: ExportPDFProps<T>) => JSX.Element
