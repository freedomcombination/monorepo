import { StrapiLocale, UploadFile } from '@fc/types'
import { Section } from '@react-email/components'
import { addDays, endOfDay } from 'date-fns'
import React, { FC } from 'react'
import { EmailButton } from '../../components/Button'
import { formatDate, formatDateRelative } from '../../utils/formatDate'
import { getTranslate } from '../../utils/getTranslate'
import CourseApplicantLayout, {
  CourseApplicantBaseProps,
  CourseApplicationKV,
} from './CourseApplicantLayout'

const CourseApplicantSubmittedAssignmentFiles: FC<CourseApplicantBaseProps> = ({
  application,
  t = getTranslate('en').t,
}) => {
  const locale = t() as StrapiLocale
  const files =
    application?.submittedAssignmentFiles ??
    Array.from({ length: 3 }).map(
      (_, i) =>
        ({
          name: 'File ' + i,
          url: 'https://example.com',
          createdAt: new Date().toISOString(),
        }) as UploadFile,
    )
  const baseDate = files[0]?.createdAt ?? new Date().toISOString()
  const evalDay = application?.course?.assignmentEvaluationTime ?? 0
  const evalDate = endOfDay(addDays(baseDate, evalDay))
  const data: CourseApplicationKV[] = [
    {
      tKey: 'course-applicant-submitted-assignment-files-kv-file-list',
      value: (
        <Section
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {files.map(file => (
            <EmailButton
              style={{
                marginRight: 6,
              }}
              key={file.url}
              href={file.url}
              target="_blank"
            >
              {file.name}
            </EmailButton>
          ))}
        </Section>
      ),
    },
    {
      tKey: 'course-applicant-submitted-assignment-files-kv-evaluation-date',
      value: `${formatDate(evalDate, 'dd MMMM yyyy', locale)} (${formatDateRelative(evalDate, locale)})`,
    },
  ]

  return (
    <CourseApplicantLayout
      preview={'course-applicant-submitted-assignment-files-preview'}
      header={'course-applicant-submitted-assignment-files-header'}
      footer={'course-applicant-submitted-assignment-files-footer'}
      data={data}
      t={t}
      course={application?.course}
      applicant={application?.profile}
      date={application?.updatedAt}
    />
  )
}

export default CourseApplicantSubmittedAssignmentFiles
