import { FC, useEffect, useState } from 'react'

import {
  Button,
  ButtonGroup,
  useSteps,
  Stack,
  Box,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { setLocale } from 'yup'
import { tr, nl, en } from 'yup-locales'

import { StrapiModel } from '@fc/types'
import { sleep } from '@fc/utils'

import { initialSteps } from './data'
import { FoundationInfo } from './FoundationInfo'
import { GeneralInfo } from './GeneralInfo'
import { PersonalInfo } from './PersonalInfo'
import { Requirements } from './Requirements'
import { joinSchema } from './schema'
import { SelectJobs } from './SelectJobs'
import { Steps } from './Steps'
import { JoinFormFieldValues, JoinFormProps } from './types'
import { ModelMedia } from '../ModelMedia'

export const JoinForm: FC<JoinFormProps> = ({
  onSubmitHandler,
  isLoading,
  platforms = [],
  foundationJobs = [],
  foundation,
}) => {
  const { t } = useTranslation()
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: initialSteps.length,
  })
  const [isChangingMedia, setIsChangingMedia] = useState(false)
  const { locale, push, query } = useRouter()
  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JoinFormFieldValues>({
    resolver: yupResolver(joinSchema()),
    mode: 'onTouched',
  })

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
    if (activeStep === 1) return
    setActiveStep(activeStep - 1)

    push({ query: { ...query, jobs: watch('jobs', []), activeStep } })
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
    push({
      query: {
        ...query,
        jobs: watch('jobs', []),
        activeStep,
      },
    })
  }

  const toggleChangingMedia = () => {
    setIsChangingMedia(!isChangingMedia)
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
      {/* <Heading as="h3" size="lg" textAlign="center" fontWeight={900}>
        {t('apply-form.title')}
      </Heading> */}
      {/* errors */}
      <Box>
        {Object.keys(errors).map((error, index) => (
          <Box key={index} color="red.500">
            {errors[error as keyof JoinFormFieldValues]?.message as string}
          </Box>
        ))}
      </Box>
      <Box overflowX="auto" whiteSpace="nowrap" p={4}>
        <Steps activeStep={activeStep} setActiveStep={setActiveStep} />
      </Box>
      {/* JOBS */}
      {activeStep === 1 && (
        <SelectJobs
          foundationJobs={foundationJobs}
          platforms={platforms}
          register={register}
          errors={errors}
        />
      )}
      {/* foundation info */}
      {activeStep === 2 && <FoundationInfo foundation={foundation} />}
      {/* requirements*/}
      {activeStep === 3 && (
        <Requirements
          foundationJobs={foundationJobs}
          platforms={platforms}
          selectedJobs={watch('jobs', [])}
        />
      )}
      {/* personal information */}
      {activeStep === 4 && <PersonalInfo register={register} errors={errors} />}
      {/*  general info*/}
      {activeStep === 5 && <GeneralInfo errors={errors} register={register} />}
      {activeStep === 6 && (
        <FormControl isRequired={true} maxW={400}>
          <FormLabel
            fontWeight={600}
            fontSize={'sm'}
            textTransform={'capitalize'}
          >
            Please Upload your CV
          </FormLabel>
          <ModelMedia
            model={'Job' as unknown as StrapiModel}
            isEditing={true}
            name={'cv'}
            setValue={setValue}
            isChangingMedia={true}
            toggleChangingMedia={toggleChangingMedia}
          />
          {/* <FormErrorMessage>{errorMessage}</FormErrorMessage> */}
        </FormControl>
      )}
      <ButtonGroup
        size={'sm'}
        overflowX={'auto'}
        justifyContent={'center'}
        spacing={4}
      >
        {activeStep > 1 && (
          <Button leftIcon={<FaArrowLeft />} onClick={handlePrev}>
            Prev
          </Button>
        )}
        {activeStep < 7 && (
          <Button rightIcon={<FaArrowRight />} onClick={handleNext}>
            Next
          </Button>
        )}
        {activeStep === 7 && (
          <Button isLoading={isLoading} type="submit">
            {t('submit')}
          </Button>
        )}
      </ButtonGroup>
    </Stack>
  )
}
