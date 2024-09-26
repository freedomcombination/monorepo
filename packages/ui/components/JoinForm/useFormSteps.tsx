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

  const steps = useMemo<UseFormStepsReturn[]>(() => {
    return [
      {
        title: t('welcome'),
        component: <Cover />,
      },
      {
        title: t('foundation'),
        component: <FoundationInfo />,
        fields: ['foundationConfirmation'],
      },
      ...((defaultJobs?.length === 0
        ? [
            {
              title: t('jobs'),
              component: <SelectJobs />,
              fields: ['jobs'],
            },
          ]
        : []) as UseFormStepsReturn[]),
      ...((selectedJobs?.some(job => job[`info_${locale}`])
        ? [
            {
              title: t('jobs-info'),
              component: <JobInfo />,
              fields: ['jobInfoConfirmation'],
            } as UseFormStepsReturn,
          ]
        : []) as UseFormStepsReturn[]),
      {
        title: t('personal-info'),
        component: <PersonalInfo />,
        fields: [
          'name',
          'email',
          'phone',
          'availableHours',
          'birthDate',
          'country',
          'city',
        ],
      },
      {
        title: 'CV',
        component: <UploadCv />,
        fields: ['cv'],
      },
      {
        title: t('summary'),
        component: <Summary />,
      },
    ]
  }, [defaultJobs?.length, locale, selectedJobs, t])

  return steps
}
