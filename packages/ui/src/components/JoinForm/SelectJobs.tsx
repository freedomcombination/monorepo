import { FC } from 'react'

import {
  Box,
  Stack,
  HStack,
  Checkbox,
  Text,
  Tooltip,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FaCircleInfo } from 'react-icons/fa6'

import { Job, Platform } from '@fc/types'

import { JoinFormFieldValues } from './types'

type SelectJobsProps = {
  foundationJobs: Job[]
  errors: FieldErrors<JoinFormFieldValues>
  platforms: Platform[]
  register: UseFormRegister<JoinFormFieldValues>
}

export const SelectJobs: FC<SelectJobsProps> = ({
  foundationJobs,
  errors,
  platforms,
  register,
}) => {
  // const { t } = useTranslation()
  const { locale } = useRouter()

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

        {platforms?.map((platform, i) => (
          <Stack key={i}>
            <Text fontWeight={600} fontSize="sm">
              {platform[`name_${locale}`]}
            </Text>
            {platform?.jobs?.map(job => (
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
