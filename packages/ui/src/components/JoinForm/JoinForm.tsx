import { FC, useState } from 'react'

import { Box, Stack, useSteps } from '@chakra-ui/react'
import { SubmitHandler, useFormContext } from 'react-hook-form'

import { PaginationButtons } from './PaginationButtons'
import { Steps } from './Steps'
import { JoinFormFieldValues, JoinFormProps } from './types'
import { useFormSteps } from './useFormSteps'

export const JoinForm: FC<JoinFormProps> = ({
  defaultJobs = [],
  foundationInfo,
  isLoading,
  jobs = [],
  onSubmitHandler,
}) => {
  const [isChangingMedia, setIsChangingMedia] = useState(false)

  const { watch, trigger, handleSubmit, setValue } =
    useFormContext<JoinFormFieldValues>()

  const toggleChangingMedia = () => {
    setIsChangingMedia(!isChangingMedia)
  }
  const steps = useFormSteps({
    defaultJobs,
    foundationInfo,
    isLoading,
    jobs,
    toggleChangingMedia,
  })

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const onSubmit: SubmitHandler<JoinFormFieldValues> = data => {
    const newData = { ...data, jobs: data.jobs.map(Number) }
    onSubmitHandler(newData as any)
  }
  const handlePrev = () => {
    if (activeStep === 0) return

    setActiveStep(activeStep - 1)
  }

  const handleNext = async () => {
    const currentStepFields =
      (steps[activeStep]?.fields as (keyof JoinFormFieldValues)[]) || []

    const isStepValid = await trigger(currentStepFields)

    const confirmationField = steps[activeStep]
      ?.confirmationField as keyof JoinFormFieldValues
    const requiresConfirmation = steps[activeStep]?.requiresConfirmation

    if (requiresConfirmation && confirmationField) {
      const isConfirmed = watch(confirmationField)

      if (!isConfirmed && confirmationField) {
        setValue(confirmationField, false, {
          shouldValidate: true,
        })

        return
      }
    }

    if (!isStepValid) {
      return
    }

    setActiveStep(activeStep + 1)
  }

  return (
    <Stack
      p={8}
      bg="white"
      rounded="lg"
      shadow="base"
      as="form"
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
      width={'100%'}
    >
      {/* steps */}
      <Box overflowX="auto" whiteSpace="nowrap" p={4}>
        <Steps
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      </Box>
      {/* pagination */}
      <PaginationButtons
        handleNext={handleNext}
        handlePrev={handlePrev}
        activeStep={activeStep}
        steps={steps}
      />
      {/* steps content */}

      {steps[activeStep]?.component}
    </Stack>
  )
}
