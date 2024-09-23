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
} from '@chakra-ui/react'

import { useJoinFormContext } from './useJoinFormContext'

export const Steps = () => {
  const { activeStep, steps } = useJoinFormContext()

  return (
    <Stepper
      size="lg"
      index={activeStep}
      display={{ base: 'none', sm: 'flex' }}
    >
      {steps.map((step, index) => (
        <Step key={index} style={{ userSelect: 'none' }}>
          <StepIndicator>
            <StepStatus
              complete={<Box as={StepIcon} />}
              incomplete={
                <Box color={'gray.200'} as={StepNumber} fontWeight={600} />
              }
              active={
                <Box as={StepNumber} color={'primary.500'} fontWeight={600} />
              }
            />
          </StepIndicator>
          <Box flexShrink="0">
            <StepDescription>{step.description}</StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
