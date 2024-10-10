import { Box } from '@chakra-ui/react'

import { useJoinFormContext } from './useJoinFormContext'
import { BlocksRenderer } from '../BlocksRenderer'

export const FoundationInfo = () => {
  const { foundationInfo } = useJoinFormContext()

  return (
    <Box
      maxH={500}
      overflowY={'auto'}
      borderWidth={1}
      borderColor={'gray.100'}
      bg={'gray.50'}
      p={4}
      rounded={'md'}
    >
      <BlocksRenderer content={foundationInfo} />
    </Box>
  )
}
