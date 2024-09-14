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
  StepTitle,
} from '@chakra-ui/react'

import { initialSteps } from './data'
type StepsProps = {
  activeStep: number
  setActiveStep: (index: number) => void
}
export const Steps: FC<StepsProps> = ({ activeStep, setActiveStep }) => {
  return (
    <Stepper size="lg" index={activeStep}>
      {initialSteps.map((step, index) => (
        <Step key={index} onClick={() => setActiveStep(index)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
