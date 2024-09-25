import { FC, useEffect, useState } from 'react'

import { useSteps } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setLocale } from 'yup'
import { en, nl, tr } from 'yup-locales'

import { sleep } from '@fc/utils/sleep'

import { JoinFormContext } from './JoinFormContext'
import { joinSchema } from './schema'
import { JoinFormFieldValues, JoinFormProviderProps } from './types'
import { useFormSteps } from './useFormSteps'

export const JoinFormProvider: FC<JoinFormProviderProps> = ({
  children,
  defaultJobs = [],
  foundationInfo,
  isLoading,
  jobs = [],
  onSubmitHandler,
}) => {
  const [isChangingMedia, setIsChangingMedia] = useState(false)

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

  const form = useForm<JoinFormFieldValues>({
    resolver: yupResolver(joinSchema()),
    mode: 'onBlur',
    defaultValues: {
      jobs: defaultJobs,
      name: '',
      birthDate: undefined,
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

  const {
    watch,
    setValue,
    trigger,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = form

  const toggleChangingMedia = () => {
    setIsChangingMedia(!isChangingMedia)
  }

  const formJobs = watch('jobs')

  const selectedJobs = jobs.filter(job => formJobs?.includes(`${job.id}`))

  const steps = useFormSteps({
    defaultJobs,
    selectedJobs,
    jobs,
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
    <JoinFormContext.Provider
      value={{
        activeStep,
        defaultJobs,
        form,
        foundationInfo,
        isLoading,
        jobs,
        selectedJobs,
        steps,
        handleNext,
        handlePrev,
        setActiveStep,
        toggleChangingMedia,

        ...form,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </JoinFormContext.Provider>
  )
}
