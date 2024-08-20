import { ReactNode, FC } from 'react'

import { HStack, Text } from '@chakra-ui/react'

type LineTextProps = {
  title: ReactNode
  value: ReactNode
}
export const LineText: FC<LineTextProps> = ({ title, value }) => {
  return (
    <HStack fontSize={'sm'} flexDir={'row'} display={'flex'} gap={4}>
      <Text width={'120px'} textAlign={'right'}>
        {title}
      </Text>{' '}
      {value}
    </HStack>
  )
}
