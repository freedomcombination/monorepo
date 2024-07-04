import { Skeleton } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

export const FilePicker = dynamic(() => import('./FilePicker'), {
  ssr: false,
  loading: () => <Skeleton rounded={'lg'} h={250} />,
})
