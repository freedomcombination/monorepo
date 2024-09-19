import { useMemo } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Foundation, Job, Platform, StrapiModel } from '@fc/types'

import { JoinFormFieldValues } from '../components'
import { FoundationInfo } from '../components/JoinForm/FoundationInfo'
import { GeneralInfo } from '../components/JoinForm/GeneralInfo'
import { PersonalInfo } from '../components/JoinForm/PersonalInfo'
import { PreviewVolunteerForm } from '../components/JoinForm/PreviewVolunteerForm'
import { Requirements } from '../components/JoinForm/Requirements'
import { SelectJobs } from '../components/JoinForm/SelectJobs'
import { ModelMedia } from '../components/ModelMedia'

type useFormStepsProps = {
  defaultJobs?: string[]
  initialJobs: Job[]
  foundationJobs: Job[]
  platforms: Platform[]
  foundation: Foundation[]
  register: UseFormRegister<JoinFormFieldValues>
  errors: FieldErrors<JoinFormFieldValues>
  isLoading: boolean
  selectedFields: JoinFormFieldValues
  watch: UseFormWatch<JoinFormFieldValues>
  getData: () => JoinFormFieldValues
  setValue: UseFormSetValue<JoinFormFieldValues>
  toggleChangingMedia: () => void
}

export const useFormSteps = ({
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
}: useFormStepsProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const steps = useMemo(() => {
    return [
      { description: 'Welcome', component: <Text>Welcome to the Form!</Text> },
      {
        description: 'Foundation',
        component: (
          <FoundationInfo
            foundation={foundation}
            register={register}
            errors={errors}
          />
        ),
        fields: [],
        requiresConfirmation: true,
        confirmationField: 'foundationConfirmation',
      },
      ...(defaultJobs?.length === 0
        ? [
            {
              description: 'Jobs',
              component: (
                <SelectJobs
                  foundationJobs={foundationJobs}
                  platforms={platforms}
                  register={register}
                  errors={errors}
                />
              ),
              fields: ['jobs'],
            },
          ]
        : []),
      ...(initialJobs?.map(job => job[`requirements_${locale}`]).length > 0
        ? [
            {
              description: 'Requirements',
              component: (
                <Requirements
                  jobs={initialJobs}
                  selectedJobs={watch('jobs', [])}
                  register={register}
                  errors={errors}
                />
              ),
              fields: [],
              requiresConfirmation: true,
              confirmationField: 'requirementsConfirmation',
            },
          ]
        : []),
      {
        description: 'Personal',
        component: <PersonalInfo register={register} errors={errors} />,
        fields: ['name', 'email', 'phone', 'availableHours', 'age', 'city'],
      },

      {
        description: 'General',
        component: <GeneralInfo errors={errors} register={register} />,
        fields: [],
      },
      {
        description: 'Upload',
        component: (
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
          </FormControl>
        ),
        fields: ['cv'],
      },
      {
        description: 'Summary',
        component: (
          <Box>
            <Text>You completed the volunteer form.</Text>
            <ButtonGroup
              size={'sm'}
              overflowX={'auto'}
              justifyContent={'center'}
              spacing={4}
            >
              {selectedFields && <PreviewVolunteerForm getData={getData} />}
              <Button isLoading={isLoading} type="submit">
                {t('submit')}
              </Button>
            </ButtonGroup>
          </Box>
        ),
      },
    ]
  }, [
    initialJobs,
    defaultJobs,
    foundation,
    foundationJobs,
    platforms,
    register,
    errors,
    isLoading,
    selectedFields,
    watch,
    getData,
    t,
    setValue,
    toggleChangingMedia,
  ])

  return steps
}
