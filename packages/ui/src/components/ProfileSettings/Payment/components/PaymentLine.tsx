import { ReactNode, FC } from 'react'

import { HStack, StackProps, Text } from '@chakra-ui/react'

type LineTextProps = {
  title: ReactNode
  children: ReactNode
} & Omit<StackProps, 'title'>

export const PaymentLine: FC<LineTextProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <HStack fontSize={'sm'} gap={4} {...props}>
      <Text width={'120px'} textAlign={'right'}>
        {title}
      </Text>
      {children}
    </HStack>
  )
}
