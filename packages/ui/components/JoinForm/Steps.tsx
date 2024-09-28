import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  VStack,
} from '@chakra-ui/react'

import { useJoinFormContext } from './useJoinFormContext'

const Steps = () => {
  const { activeStep, steps } = useJoinFormContext()

  return (
    <Stepper index={activeStep} gap={2}>
      {steps.map((step, index) => (
        <Step key={index} style={{ userSelect: 'none', gap: 0 }}>
          <VStack gap={1}>
            <StepIndicator>
              <StepStatus
                complete={<Box as={StepIcon} />}
                incomplete={
                  <Box color={'gray.300'} as={StepNumber} fontWeight={600} />
                }
                active={
                  <Box as={StepNumber} color={'primary.500'} fontWeight={600} />
                }
              />
            </StepIndicator>

            <Box
              maxW={20}
              isTruncated
              as={StepDescription}
              color={'gray.300'}
              fontWeight={600}
            >
              {step.title}
            </Box>
          </VStack>
          <Box as={StepSeparator} transform={'translateY(12px)'} />
        </Step>
      ))}
    </Stepper>
  )
}

export default Steps
