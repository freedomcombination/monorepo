import { useMemo } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { Cover } from './Cover'
import { FoundationInfo } from './FoundationInfo'
import { JobInfo } from './JobInfo'
import { PersonalInfo } from './PersonalInfo'
import { SelectJobs } from './SelectJobs'
import { Summary } from './Summary'
import { UseFormStepsProps, UseFormStepsReturn } from './types'
import { UploadCv } from './UploadCv'

export const useFormSteps = ({
  defaultJobs,
  selectedJobs,
}: UseFormStepsProps): UseFormStepsReturn[] => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const steps = useMemo(() => {
    return [
      {
        description: 'Welcome',
        component: <Cover />,
      },
      {
        description: 'Foundation',
        component: <FoundationInfo />,
        requiresConfirmation: true,
        confirmationField: 'foundationConfirmation',
      },
      ...(defaultJobs?.length === 0
        ? [
            {
              description: 'Jobs',
              component: <SelectJobs />,
              fields: ['jobs'],
            },
          ]
        : []),
      ...(selectedJobs?.some(job => job[`info_${locale}`])
        ? [
            {
              description: 'Job Info',
              component: <JobInfo />,
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
        component: <UploadCv />,
        fields: ['cv'],
      },
      {
        description: 'Summary',
        component: <Summary />,
      },
    ]
  }, [defaultJobs?.length, locale, selectedJobs, t])

  return steps
}
