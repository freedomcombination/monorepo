import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  Stack,
} from '@chakra-ui/react'
import { BlocksContent } from '@strapi/blocks-react-renderer'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useJoinFormContext } from './useJoinFormContext'
import { BlocksRenderer } from '../BlocksRenderer'

export const JobInfo = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const {
    selectedJobs,
    register,
    formState: { errors },
  } = useJoinFormContext()

  const filteredJobs = selectedJobs.filter(job => job[`info_${locale}`])

  return (
    <Stack>
      {filteredJobs?.map(job => {
        const jobName = job[`name_${locale}`] || ''
        const jobInfo = job[`info_${locale}`] as BlocksContent

        return (
          <Stack
            key={job?.id}
            bg={'gray.50'}
            borderWidth={1}
            borderColor={'gray.100'}
            rounded={'md'}
            p={4}
          >
            <Heading as="h4" size="md" textAlign="start" fontWeight={700}>
              {jobName}
            </Heading>

            <BlocksRenderer content={jobInfo} />

            {jobInfo && (
              <FormControl isRequired isInvalid={!!errors?.jobInfoConfirmation}>
                <Checkbox {...register('jobInfoConfirmation')}>
                  {t('read-and-accept')}
                </Checkbox>
                <FormErrorMessage>
                  {errors?.jobInfoConfirmation?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
