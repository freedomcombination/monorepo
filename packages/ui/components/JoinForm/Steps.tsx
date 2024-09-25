import { VStack } from '@chakra-ui/react'

import { StepsItem, StepsList, StepsRoot } from '@fc/chakra'

import { useJoinFormContext } from './useJoinFormContext'

const Steps = () => {
  const { activeStep, steps } = useJoinFormContext()

  return (
    <StepsRoot key={activeStep} gap={2} count={steps.length}>
      {steps.map((step, index) => (
        <StepsList key={index} style={{ userSelect: 'none', gap: 0 }}>
          <VStack gap={1}>
            <StepsItem index={index} title={step.title}>
              {step.title}
            </StepsItem>
          </VStack>
        </StepsList>
      ))}
    </StepsRoot>
  )
}

export default Steps
