import { FC } from 'react'

import {
  Stack,
  Heading,
  Box,
  Text,
  FormControl,
  Checkbox,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Job } from '@fc/types'

import { JoinFormFieldValues } from './types'

export type RequirementsProps = {
  jobs: Job[]
  selectedJobs: string[]
  register: UseFormRegister<JoinFormFieldValues>
  errors: FieldErrors<JoinFormFieldValues>
}

export const Requirements: FC<RequirementsProps> = ({
  jobs,
  selectedJobs,
  errors,
  register,
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  // Convert selectedJobs (string[]) to number[]
  const selectedJobIds = selectedJobs.map(jobId => Number(jobId))

  // Filter jobs based on selectedJobIds
  const currentJobs = jobs?.filter(job => selectedJobIds.includes(job?.id))

  // Function to render richText block
  const renderRichTextBlock = (block: any) => {
    switch (block.type) {
      case 'paragraph':
        return <Text>{block.children[0].text}</Text>
      case 'heading':
        return (
          <Heading as={`h${block.level}`} size={`lg`} textAlign="start">
            {block.children[0].text}
          </Heading>
        )
      case 'list':
        return (
          <ul>
            {block.children.map((item: any, idx: number) => (
              <li key={idx}>{item.text}</li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <Stack>
      <Heading as="h3" size="lg" textAlign="start" fontWeight={900}>
        Requirements and responsibilities
      </Heading>
      {currentJobs?.map(job => {
        const jobName = job?.[`name_${locale}`] || job?.name_en || ''
        const jobRequirements = Array.isArray(job?.[`requirements_${locale}`])
          ? job?.[`requirements_${locale}`]
          : []
        const jobResponsibilities = Array.isArray(
          job?.[`responsibilities_${locale}`],
        )
          ? (job?.[`responsibilities_${locale}`] as string)
          : ([] as string[])

        return (
          <Box key={job?.id}>
            {
              <>
                <Heading as="h4" size="md" textAlign="start" fontWeight={700}>
                  {jobName}
                </Heading>
                {/* Render richText block */}
                <Text fontWeight={600} fontSize="sm">
                  Requirements
                </Text>
                {jobRequirements?.map((block: any, idx: number) => (
                  <Box key={idx}>{renderRichTextBlock(block)}</Box>
                ))}
                <Text fontWeight={600} fontSize="sm">
                  Responsibilities
                </Text>
                {jobResponsibilities?.map((block: any, idx: number) => (
                  <Box key={idx}>{renderRichTextBlock(block)}</Box>
                ))}
                <FormControl
                  isRequired
                  isInvalid={!!errors?.requirementsConfirmation}
                >
                  <Checkbox
                    {...register('requirementsConfirmation', {
                      required: 'You must accept the Requirements information',
                    })}
                  >
                    {t('I have read and accept the requirements information')}
                  </Checkbox>
                  <FormErrorMessage>
                    {errors?.requirementsConfirmation?.message}
                  </FormErrorMessage>
                </FormControl>
              </>
            }
          </Box>
        )
      })}
    </Stack>
  )
}
