import React, { FC } from 'react'
import type {
  CourseApplicantBaseProps,
  CourseApplicationKV,
} from '../CourseApplication/CourseApplicantLayout'
import CourseApplicantLayout from '../CourseApplication/CourseApplicantLayout'
import { getTranslate } from '../../utils/getTranslate'

const CourseApplicantWithoutPayment: FC<CourseApplicantBaseProps> = ({
  application,
  t = getTranslate('en').t,
}) => {
  const data: CourseApplicationKV[] = [
    { tKey: 'details', value: application.paymentExplanation },
  ]

  return (
    <CourseApplicantLayout
      preview={'course-applicant-unpaid-preview'}
      header={'course-applicant-unpaid-header'}
      footer={'course-applicant-unpaid-footer'}
      applicant={application.profile}
      course={application.course}
      t={t}
      data={data}
      date={application.updatedAt}
    />
  )
}

export default CourseApplicantWithoutPayment
