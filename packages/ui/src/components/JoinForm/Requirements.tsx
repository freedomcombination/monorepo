import { FC } from 'react'

import { Stack, Heading, Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Job, Platform } from '@fc/types'

export type RequirementsProps = {
  platforms: Platform[]
  foundationJobs: Job[]
  selectedJobs: string[] // string array, but we need to convert to number
}

export const Requirements: FC<RequirementsProps> = ({
  foundationJobs,
  platforms,
  selectedJobs,
}) => {
  const { locale } = useRouter()

  // Convert selectedJobs (string[]) to number[]
  const selectedJobIds = selectedJobs.map(jobId => Number(jobId))

  // Get jobs from platforms
  const jobs = platforms.map(platform => platform.jobs).flat()

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
        const jobRequirements =
          job?.[`requirements_${locale}`] || job?.requirements_en || []
        const jobResponsibilities =
          job?.[`responsibilities_${locale}`] || job?.responsibilities_en || []

        return (
          <Box key={job?.id}>
            {
              // check if jobName is empty
              jobRequirements?.length > 0 || jobResponsibilities?.length > 0 ? (
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
                  {// Render richText block
                  jobResponsibilities?.map((block: any, idx: number) => (
                    <Box key={idx}>{renderRichTextBlock(block)}</Box>
                  ))}
                </>
              ) : (
                <>
                  <Heading as="h4" size="md" textAlign="start" fontWeight={700}>
                    {jobName} don't have any requirements or responsibilities
                  </Heading>
                </>
              )
            }
          </Box>
        )
      })}
    </Stack>
  )
}
