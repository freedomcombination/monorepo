import { Course, StrapiLocale, UploadFile } from '@fc/types'
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

type CourseApplicantSubmittedAssignmentFilesProps = CourseApplicantBaseProps & {
  files: UploadFile[]
}

const CourseApplicantSubmittedAssignmentFiles: FC<
  CourseApplicantSubmittedAssignmentFilesProps
> = ({
  files = Array.from({ length: 5 }).map(
    (_, i) =>
      ({
        name: `File ${i + 1}`,
        url: `https://example.com/file-${i + 1}.pdf`,
        createdAt: new Date().toString(),
      }) as UploadFile,
  ),
  course = {
    id: 1,
    slug: 'some.important.course',
    title_en: 'Some important course',
    title_nl: 'Some important course',
    title_tr: 'Some important course',
    assignmentEvaluationTime: 7,
  } as Course,
  t = getTranslate('en').t,
  ...props
}) => {
    const locale = t() as StrapiLocale
    const evalDate = endOfDay(
      addDays(files[0].createdAt, course.assignmentEvaluationTime ?? 0),
    )
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
        course={course}
        {...props}
      />
    )
  }

export default CourseApplicantSubmittedAssignmentFiles
