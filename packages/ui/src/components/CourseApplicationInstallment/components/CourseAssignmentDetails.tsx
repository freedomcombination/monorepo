import { FC } from 'react'

import { Link, Stack, Wrap, Text } from '@chakra-ui/react'
import { addDays } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { formatDate } from '@fc/utils'

import { KeyValue } from '../../KeyValueView'
import { CourseApplicationDetailsProps } from '../CourseApplicationDetails'

export const CourseAssignmentDetails: FC<CourseApplicationDetailsProps> = ({
  course,
  application,
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const filesSent =
    !!application.submittedAssignmentFiles &&
    !!application.submittedAssignmentFiles.length

  if (!course.requireApproval) return null

  return (
    <Stack spacing={2} borderWidth={1} borderRadius={'lg'} p={4}>
      <KeyValue tKey="course.applicant.details.assignment-files">
        {filesSent ? (
          <Wrap spacing={2}>
            {application?.submittedAssignmentFiles?.map(file => (
              <Link
                href={file.url}
                key={file.name}
                target={'_blank'}
                rel={'noreferrer noopener'}
              >
                {file.name}
              </Link>
            ))}
          </Wrap>
        ) : (
          <Text>{t('course.applicant.details.assignment-files.not-yet')}</Text>
        )}
      </KeyValue>

      <KeyValue
        when={filesSent}
        tKey="course.applicant.details.assignment-files.date"
      >
        {formatDate(application.lastUpdateDate ?? 0, 'dd MMMM yyyy', locale)}
      </KeyValue>

      <KeyValue
        when={!filesSent}
        tKey="course.applicant.details.assignment-files.due-date"
      >
        {formatDate(
          addDays(
            application.createdAt ?? 0,
            course.assignmentSubmissionDeadline ?? 3,
          ),
          'dd MMMM yyyy',
          locale,
        )}
      </KeyValue>
    </Stack>
  )
}
