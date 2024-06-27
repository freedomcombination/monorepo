import dynamic from 'next/dynamic'
import { Button } from '@chakra-ui/react'
import { FaFilePdf } from 'react-icons/fa6'

export const ExportPDF = dynamic(() => import('./ExportPDF'), {
  ssr: false,
  loading: () => (
    <Button leftIcon={<FaFilePdf />} colorScheme="primary" variant="outline">
      Export PDF
    </Button>
  ),
})
