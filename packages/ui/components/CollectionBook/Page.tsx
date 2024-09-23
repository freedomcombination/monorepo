import { forwardRef } from 'react'

import { Center } from '@chakra-ui/react'

import { PageProps } from './types'

export const Page = forwardRef<HTMLDivElement, PageProps>(
  function Page(props, ref) {
    return (
      <Center ref={ref} rounded="md" p={8} overflow="auto" {...props}>
        {props.children}
      </Center>
    )
  },
)
