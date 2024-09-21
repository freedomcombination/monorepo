import { useMemo } from 'react'

import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { StrapiModel } from '@fc/types'

import { FoundationInfo } from './FoundationInfo'
import { JobInfo } from './JobInfo'
import { PersonalInfo } from './PersonalInfo'
import { PreviewVolunteerForm } from './PreviewVolunteerForm'
import { SelectJobs } from './SelectJobs'
import {
  JoinFormFieldValues,
  UseFormStepsProps,
  UseFormStepsReturn,
} from './types'
import { FormItem } from '../FormItem'
import { ModelMedia } from '../ModelMedia'

export const useFormSteps = ({
  defaultJobs,
  foundationInfo,
  isLoading,
  jobs,
  toggleChangingMedia,
}: UseFormStepsProps): UseFormStepsReturn[] => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useFormContext<JoinFormFieldValues>()

  const formData = watch()

  const selectedJobs = formData.jobs

  const steps = useMemo(() => {
    return [
      {
        description: 'Welcome',
        component: <Text>Welcome to the Form!</Text>,
      },
      {
        description: 'Foundation',
        component: <FoundationInfo foundationInfo={foundationInfo} />,
        requiresConfirmation: true,
        confirmationField: 'foundationConfirmation',
      },
      ...(defaultJobs?.length === 0
        ? [
            {
              description: 'Jobs',
              component: <SelectJobs jobs={jobs} />,
              fields: ['jobs'],
            },
          ]
        : []),
      ...(selectedJobs?.some(job => job[`info_${locale}`])
        ? [
            {
              description: 'Job Info',
              component: <JobInfo selectedJobs={selectedJobs} />,
              requiresConfirmation: true,
              confirmationField: 'jobInfoConfirmation',
            },
          ]
        : []),
      {
        description: 'Personal',
        component: <PersonalInfo />,
        fields: [
          'name',
          'email',
          'phone',
          'availableHours',
          'age',
          'adress.country',
          'adress.city',
        ],
      },
      {
        description: 'Upload',
        component: (
          <FormControl isRequired={true} isInvalid={!!errors.cv?.message}>
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
            <FormErrorMessage>{errors.cv?.message}</FormErrorMessage>
          </FormControl>
        ),
        fields: ['cv'],
      },
      {
        description: 'Summary',
        component: (
          <Stack spacing={4}>
            <Text>
              You completed the volunteer form. If you want to add one, we would
              to hear from you.
            </Text>
            {/* comment */}
            <FormItem
              as={Textarea}
              register={register}
              errors={errors}
              id="comment"
              name="comment"
            />
            <ButtonGroup
              size={'sm'}
              overflowX={'auto'}
              justifyContent={'center'}
              spacing={4}
            >
              {isValid && <PreviewVolunteerForm />}
              <Button isLoading={isLoading} type="submit" size={'lg'}>
                {t('submit')}
              </Button>
            </ButtonGroup>
          </Stack>
        ),
      },
    ]
  }, [
    defaultJobs?.length,
    errors,
    foundationInfo,
    isLoading,
    jobs,
    locale,
    isValid,
    selectedJobs,
    t,
    register,
    setValue,
    toggleChangingMedia,
  ])

  return steps
}
