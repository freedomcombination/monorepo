import { FC, useEffect, useState } from 'react'

import { Box, Stack, useSteps } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setLocale } from 'yup'
import { en, nl, tr } from 'yup-locales'

import { sleep } from '@fc/utils'

import { PaginationButtons } from './PaginationButtons'
import { joinSchema } from './schema'
import { Steps } from './Steps'
import { JoinFormFieldValues, JoinFormProps } from './types'
import { useFormSteps } from './useFormSteps'

export const JoinForm: FC<JoinFormProps> = ({
  defaultJobs = [],
  foundationInfo,
  isLoading,
  jobs: initialJobs = [],
  onSubmitHandler,
}) => {
  // TODO add translate
  const [selectedFields, setSelectedFields] = useState(
    {} as JoinFormFieldValues,
  )

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<JoinFormFieldValues>({
    resolver: yupResolver(joinSchema()),
    mode: 'onBlur',
    defaultValues: {
      jobs: defaultJobs,
      name: '',
      age: 0,
      address: { country: '', city: '', street: '', postcode: '' },
      email: '',
      phone: '',
      comment: '',
      inMailingList: false,
      isPublic: false,
      availableHours: 0,
      heardFrom: [],
      cv: undefined,
      foundationConfirmation: false,
      jobInfoConfirmation: false,
    },
  })

  const getSelectedJobs = () => {
    const formJobs = watch('jobs', [])

    const selectedJobsIDs = formJobs && formJobs?.map(jobId => Number(jobId))
    const selectedJobs = initialJobs?.filter(job =>
      selectedJobsIDs.includes(job?.id),
    )

    return selectedJobs
  }

  const getData = () => {
    const selectedJobFields = getSelectedJobs()
    const volunteerFormData = watch()

    const data = {
      ...volunteerFormData,
      jobs: selectedJobFields,
    }
    if (JSON.stringify(selectedFields) !== JSON.stringify(data)) {
      setSelectedFields(data)
    }

    return data
  }
  const [isChangingMedia, setIsChangingMedia] = useState(false)

  const toggleChangingMedia = () => {
    setIsChangingMedia(!isChangingMedia)
  }
  const steps = useFormSteps({
    defaultJobs,
    errors,
    foundationInfo,
    isLoading,
    jobs: initialJobs,
    selectedFields,
    getData,
    register,
    setValue,
    toggleChangingMedia,
    watch,
  })

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const { locale } = useRouter()

  useEffect(() => {
    if (locale === 'tr') setLocale(tr)
    else if (locale === 'nl') setLocale(nl)
    else setLocale(en)

    const updateErrorFields = async () => {
      await sleep(100)
      const errorKeys = Object.keys(errors) as (keyof JoinFormFieldValues)[]

      errorKeys.forEach(fieldName => {
        if (errors[fieldName]) {
          clearErrors(fieldName)
          trigger(fieldName)
        }
      })
    }
    updateErrorFields()
  }, [locale])

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

      if (!isConfirmed) {
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
