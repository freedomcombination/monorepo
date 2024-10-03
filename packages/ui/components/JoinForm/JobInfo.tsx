import { Heading, Box } from '@chakra-ui/react'
import { BlocksContent } from '@strapi/blocks-react-renderer'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  Checkbox,
  Field,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@fc/chakra'

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
    <Accordion collapsible>
      {filteredJobs?.map((job, index) => {
        const jobName = job[`name_${locale}`] || ''
        const jobInfo = job[`info_${locale}`] as BlocksContent

        return (
          <AccordionItem
            value={`${index}`}
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
              <AccordionIcon />
            </AccordionButton>

            {/* TODO: Allow users to read the content in modal as well */}
            <AccordionPanel>
              <Box maxH={420} overflowY={'auto'}>
                <BlocksRenderer content={jobInfo} />
              </Box>
            </AccordionPanel>
          </AccordionItem>
        )
      })}
      <Field
        required
        invalid={!!errors?.jobInfoConfirmation}
        errorText={errors?.jobInfoConfirmation?.message}
      >
        {/* TODO: Trigger job info confirmation error */}
        <Checkbox {...register('jobInfoConfirmation')}>
          {t('read-and-accept')}
        </Checkbox>
      </Field>
    </Accordion>
  )
}
