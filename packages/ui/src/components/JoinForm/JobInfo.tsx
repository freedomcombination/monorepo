import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

import { JoinFormFieldValues } from './types'

export const JobInfo = () => {
  const { locale } = useRouter()

  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<JoinFormFieldValues>()

  const selectedJobs = watch('jobs')

  // TODO: Use @strapi/blocks-react-renderer to render richText block
  // Convert selectedJobs (string[]) to number[]
  console.log('selectedJobs in job info', selectedJobs)
  const info = selectedJobs.map(job => job[`info_${locale}`])
  console.log('info', info !== null)
  // Function to render richText block
  const renderRichTextBlock = (block: any) => {
    switch (block.type) {
      case 'paragraph':
        return <Text>{block.children[0].text}</Text>
      case 'heading':
        return (
          <Heading
            as={`h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
            size={`lg`}
            textAlign="start"
          >
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
      {info !== null &&
        selectedJobs?.map(job => {
          const jobName = job[`name_${locale}`] || ''
          const jobInfo = Array.isArray(job[`info_${locale}`])
            ? job[`info_${locale}`]
            : []

          return (
            <Box key={job?.id}>
              <Heading as="h4" size="md" textAlign="start" fontWeight={700}>
                {jobName}
              </Heading>
              {/* Render richText block */}
              <Text fontWeight={600} fontSize="sm">
                Job Information
              </Text>
              {jobInfo &&
                Array.isArray(jobInfo) &&
                jobInfo.map((block: any, idx: number) => (
                  <Box key={idx}>{renderRichTextBlock(block)}</Box>
                ))}

              {jobInfo && (
                <FormControl
                  isRequired
                  isInvalid={!!errors?.jobInfoConfirmation}
                >
                  <Checkbox
                    {...register('jobInfoConfirmation', {
                      required: 'You must accept the job info information',
                    })}
                  >
                    {/* TODO: Translate */}I have read and accept the job info
                    information
                  </Checkbox>
                  <FormErrorMessage>
                    {errors?.jobInfoConfirmation?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Box>
          )
        })}
    </Stack>
  )
}
