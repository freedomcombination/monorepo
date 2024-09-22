import {
  Box,
  Checkbox,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { FaCircleInfo } from 'react-icons/fa6'

import { Job } from '@fc/types'

import { JoinFormFieldValues } from './types'
import { useJoinFormContext } from './useJoinFormContext'

export const SelectJobs = () => {
  // const { t } = useTranslation()
  const { locale } = useRouter()
  const {
    register,
    formState: { errors },
  } = useFormContext<JoinFormFieldValues>()
  const { jobs } = useJoinFormContext()

  const foundationJobs = jobs.filter(job => job.platform === null)

  // Group by platform.name_{locale}
  const platformJobs = jobs
    .filter(job => job.platform)
    .reduce(
      (acc, job) => {
        if (job.platform === null) return acc

        const platformName = job.platform?.[`name_${locale}`] as string

        if (!acc[platformName]) {
          acc[platformName] = []
        }

        acc[platformName].push(job)

        return acc
      },
      {} as Record<string, Job[]>,
    )

  return (
    <Stack gap={4}>
      <Heading as="h3" size="lg" textAlign="start" fontWeight={900}>
        {/* TODO: Translate */}
        Hangi işlerde bizimle birlikte çalışmak istersiniz?
      </Heading>

      {/* {t('jobs')} */}

      <SimpleGrid
        gap={8}
        columns={{ sm: 2, md: 3 }}
        rounded="lg"
        p={4}
        borderWidth={2}
        borderColor={errors['jobs'] ? 'red.500' : 'gray.100'}
      >
        {foundationJobs.length > 0 && (
          <Stack>
            <Text fontWeight={600} fontSize="sm">
              Freedom Combination Foundation
            </Text>
            {foundationJobs?.map(job => (
              <HStack key={job.id} align={'center'}>
                <Checkbox
                  key={job.id}
                  id={job.id.toString()}
                  {...register(`jobs`)}
                  value={job.id}
                  textTransform={'capitalize'}
                >
                  {job[`name_${locale}`]}
                </Checkbox>
                {job[`description_${locale}`] && (
                  <Tooltip
                    placement="top-end"
                    bg={'white'}
                    color={'initial'}
                    borderWidth={1}
                    rounded={'md'}
                    label={job[`description_${locale}`] as string}
                    aria-label={job[`description_${locale}`] as string}
                  >
                    <Box>
                      <FaCircleInfo />
                    </Box>
                  </Tooltip>
                )}
              </HStack>
            ))}
          </Stack>
        )}

        {Object.keys(platformJobs)?.map((platform, i) => (
          <Stack key={i}>
            <Text fontWeight={600} fontSize="sm">
              {platform}
            </Text>
            {platformJobs[platform]?.map(job => (
              <Checkbox
                key={job.id}
                id={job.id.toString()}
                {...register(`jobs`)}
                value={job.id}
                textTransform={'capitalize'}
              >
                {job[`name_${locale}`]}
              </Checkbox>
            ))}
          </Stack>
        ))}

        {errors['jobs'] && (
          <Text fontSize="sm" color="red.500">
            {errors.jobs.message}
          </Text>
        )}
      </SimpleGrid>
    </Stack>
  )
}