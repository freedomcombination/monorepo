import { FC, PropsWithChildren } from 'react'

import { Heading } from '@chakra-ui/react'

export const PageTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Heading
      as="h1"
      textAlign="center"
      fontWeight={900}
      fontSize={{ base: '3xl', md: '4xl' }}
      mt={16}
      mb={8}
    >
      {children}
    </Heading>
  )
}
