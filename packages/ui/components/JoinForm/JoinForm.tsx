import { Box, Stack } from '@chakra-ui/react'

import { PaginationButtons } from './PaginationButtons'
import { Steps } from './Steps'
import { useJoinFormContext } from './useJoinFormContext'

export const JoinForm = () => {
  const { steps, activeStep } = useJoinFormContext()

  return (
    <Stack
      p={8}
      bg="white"
      rounded="lg"
      shadow="base"
      spacing={4}
      width={'100%'}
    >
      {/* steps */}
      <Box overflowX="auto" whiteSpace="nowrap" p={4}>
        <Steps />
      </Box>
      {/* pagination */}
      <PaginationButtons />
      {/* steps content */}

      {steps[activeStep]?.component}
    </Stack>
  )
}
