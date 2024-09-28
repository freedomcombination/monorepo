import React, { FC } from 'react'
import type {
  CourseApplicantBaseProps,
  CourseApplicationKV,
} from '../CourseApplication/CourseApplicantLayout'
import CourseApplicantLayout from '../CourseApplication/CourseApplicantLayout'

type CourseApplicantWithoutPaymentProps = CourseApplicantBaseProps & {
  explanation: string
}

const CourseApplicantWithoutPayment: FC<CourseApplicantWithoutPaymentProps> = ({
  explanation = 'no explanation',
  t,
  ...props
}) => {
  const data: CourseApplicationKV[] = [{ tKey: 'details', value: explanation }]

  return (
    <CourseApplicantLayout
      preview={'course-applicant-unpaid-preview'}
      header={'course-applicant-unpaid-header'}
      footer={'course-applicant-unpaid-footer'}
      t={t}
      data={data}
      {...props}
    />
  )
}

export default CourseApplicantWithoutPayment
