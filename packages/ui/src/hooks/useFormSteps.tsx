import { useMemo } from 'react'

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Textarea,
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

import { FormItem, JoinFormFieldValues } from '../components'
import { FoundationInfo } from '../components/JoinForm/FoundationInfo'
import { JobInfo } from '../components/JoinForm/JobInfo'
import { PersonalInfo } from '../components/JoinForm/PersonalInfo'
import { PreviewVolunteerForm } from '../components/JoinForm/PreviewVolunteerForm'
import { SelectJobs } from '../components/JoinForm/SelectJobs'
import { ModelMedia } from '../components/ModelMedia'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

type useFormStepsProps = {
  defaultJobs?: string[]
  errors: FieldErrors<JoinFormFieldValues>
  foundationInfo: MDXRemoteSerializeResult
  foundationJobs: Job[]
  initialJobs: Job[]
  isLoading: boolean
  platforms: Platform[]
  selectedFields: JoinFormFieldValues
  getData: () => JoinFormFieldValues
  register: UseFormRegister<JoinFormFieldValues>
  setValue: UseFormSetValue<JoinFormFieldValues>
  toggleChangingMedia: () => void
  watch: UseFormWatch<JoinFormFieldValues>
}

export const useFormSteps = ({
  defaultJobs,
  errors,
  foundationInfo,
  foundationJobs,
  isLoading,
  platforms,
  selectedFields,
  getData,
  register,
  setValue,
  toggleChangingMedia,
}: useFormStepsProps) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const selectedJobs = getData().jobs
  const steps = useMemo(() => {
    return [
      {
        description: 'Welcome',
        component: <Text>Welcome to the Form!</Text>,
      },
      {
        description: 'Foundation',
        component: (
          <FoundationInfo
            foundationInfo={foundationInfo}
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
      ...(selectedJobs?.some(job => job[`info_${locale}`])
        ? [
            {
              description: 'Job Info',
              component: (
                <JobInfo
                  selectedJobs={selectedJobs}
                  register={register}
                  errors={errors}
                />
              ),
              fields: [],
              requiresConfirmation: true,
              confirmationField: 'jobInfoConfirmation',
            },
          ]
        : []),
      {
        description: 'Personal',
        component: (
          <PersonalInfo
            register={register}
            errors={errors}
            setValue={setValue}
          />
        ),
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
              {selectedFields && <PreviewVolunteerForm getData={getData} />}
              <Button isLoading={isLoading} type="submit">
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
    foundationJobs,
    isLoading,
    locale,
    platforms,
    selectedFields,
    selectedJobs,
    t,
    getData,
    register,
    setValue,
    toggleChangingMedia,
  ])

  return steps
}
