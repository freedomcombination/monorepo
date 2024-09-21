import React, { FC } from 'react'

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

import { UseFormStepsReturn } from './types'

type StepsProps = {
  activeStep: number
  setActiveStep: (index: number) => void
  steps: UseFormStepsReturn[]
}

export const Steps: FC<StepsProps> = ({ activeStep, setActiveStep, steps }) => {
  return (
    <Stepper
      size="lg"
      index={activeStep}
      display={{ base: 'none', sm: 'flex' }}
    >
      {steps.map((step, index) => (
        <Step key={index} onClick={() => setActiveStep(index)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
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
