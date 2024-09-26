import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
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
    <Accordion defaultIndex={0} allowToggle>
      {filteredJobs?.map(job => {
        const jobName = job[`name_${locale}`] || ''
        const jobInfo = job[`info_${locale}`] as BlocksContent

        return (
          <AccordionItem
            _notLast={{ mb: 2 }}
            key={job?.id}
            bg={'gray.50'}
            borderWidth={1}
            borderColor={'gray.100'}
            rounded={'md'}
            p={4}
          >
            <AccordionButton>
              <Heading as="h4" size="md" textAlign="start" fontWeight={700}>
                {jobName}
              </Heading>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>

            {/* TODO: Allow users to read the content in modal as well */}
            <AccordionPanel>
              <Box
                maxH={filteredJobs?.length > 1 ? 300 : 500}
                overflowY={'auto'}
              >
                <BlocksRenderer content={jobInfo} />
              </Box>
            </AccordionPanel>
          </AccordionItem>
        )
      })}
      <FormControl isRequired isInvalid={!!errors?.jobInfoConfirmation}>
        {/* TODO: Trigger job info confirmation error */}
        <Checkbox {...register('jobInfoConfirmation')}>
          {t('read-and-accept')}
        </Checkbox>
        <FormErrorMessage>
          {errors?.jobInfoConfirmation?.message}
        </FormErrorMessage>
      </FormControl>
    </Accordion>
  )
}
