import { FC, useEffect, useState } from 'react'

import { useSteps, Stack, Box } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setLocale } from 'yup'
import { tr, nl, en } from 'yup-locales'

import { Job } from '@fc/types'
import { sleep } from '@fc/utils'

import { PaginationButtons } from './PaginationButtons'
import { joinSchema } from './schema'
import { Steps } from './Steps'
import { JoinFormFieldValues, JoinFormProps } from './types'
import { useFormSteps } from '../../hooks/useFormSteps'

export const JoinForm: FC<JoinFormProps> = ({
  onSubmitHandler,
  isLoading,
  platforms = [],
  foundationJobs = [],
  foundation,
  defaultJobs = ['25'],
}) => {
  const { t } = useTranslation()

  const [selectedFields, setSelectedFields] = useState(
    {} as JoinFormFieldValues,
  )
  const initialJobs =
    [foundationJobs?.flat(), platforms?.map(platform => platform.jobs).flat()]
      .flat()
      .filter((job): job is Job => job !== undefined) || []
  console.log('hideFields', defaultJobs)
  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    watch,
    setValue,
    formState: { errors, defaultValues },
  } = useForm<JoinFormFieldValues>({
    resolver: yupResolver(joinSchema()),
    mode: 'onTouched',
    defaultValues: {
      jobs: defaultJobs,
      name: '',
      age: 0,
      city: '',
      email: '',
      phone: '',
      comment: '',
      inMailingList: false,
      isPublic: false,
      availableHours: 0,
      heardFrom: [],
      cv: '',
      foundationConfirmation: false,
      requirementsConfirmation: false,
    },
  })
  console.log('defaultValues', defaultValues)

  const getData = () => {
    const selectedJobFields = getSelectedJobs()
    const volunteerFormData = watch()

    const data = {
      ...volunteerFormData,
      jobs: selectedJobFields,
    }
    setSelectedFields(data)

    return data
  }
  const [isChangingMedia, setIsChangingMedia] = useState(false)

  const toggleChangingMedia = () => {
    setIsChangingMedia(!isChangingMedia)
  }
  const steps = useFormSteps({
    defaultJobs,
    initialJobs,
    foundationJobs,
    platforms,
    foundation,
    register,
    errors,
    isLoading,
    selectedFields,
    watch,
    getData,
    setValue,
    toggleChangingMedia,
  }).map(step => ({
    ...step,
    fields: step.fields || [],
  }))

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
      Object.keys(errors).forEach(fieldName => {
        if (errors[fieldName as keyof JoinFormFieldValues]) {
          clearErrors(fieldName as keyof JoinFormFieldValues)
          trigger(fieldName as keyof JoinFormFieldValues)
        }
      })
    }
    updateErrorFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const confirmationField = steps[activeStep]?.confirmationField
    console.log('confirmationField', confirmationField)
    console.log(
      'watch(confirmationField)',
      watch(confirmationField as keyof JoinFormFieldValues),
    )
    if (
      steps[activeStep]?.requiresConfirmation &&
      confirmationField &&
      !watch(confirmationField as keyof JoinFormFieldValues)
    ) {
      return
    }

    if (!isStepValid) {
      return
    }
    setActiveStep(activeStep + 1)
  }

  const getSelectedJobs = () => {
    const formJobs = watch('jobs', [])

    const selectedJobsIDs = formJobs && formJobs?.map(jobId => Number(jobId))
    const selectedJobs = initialJobs?.filter(job =>
      selectedJobsIDs.includes(job?.id),
    )

    return selectedJobs
  }

  console.log('errors', errors)

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
      {/* errors */}
      <Box>
        {Object.keys(errors).map((error, index) => (
          <Box key={index} color="red.500">
            {errors[error as keyof JoinFormFieldValues]?.message as string}
          </Box>
        ))}
      </Box>
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
