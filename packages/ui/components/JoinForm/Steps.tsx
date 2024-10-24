import { StepsItem, StepsList, StepsRoot } from '@fc/chakra'

import { useJoinFormContext } from './useJoinFormContext'

const Steps = () => {
  const { activeStep, steps } = useJoinFormContext()

  return (
    <StepsRoot key={activeStep} gap={2} count={steps.length}>
      <StepsList style={{ userSelect: 'none', gap: 0 }}>
        {steps.map((step, index) => (
          <StepsItem key={index} index={index} title={step.title} />
        ))}
      </StepsList>
    </StepsRoot>
  )
}

export default Steps
