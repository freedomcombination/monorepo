import React, { FC } from 'react'
import CourseApplicantLayout, {
  CourseApplicantBaseProps,
} from './CourseApplicantLayout'
import { translations } from '../../utils/translations'

type CourseApplicantApproveProps = CourseApplicantBaseProps & {
  approved: boolean
}

const CourseApplicantApprove: FC<CourseApplicantApproveProps> = ({
  approved = true,
  ...props
}) => {
  return (
    <CourseApplicantLayout

      preview={'course-applicant-approve-preview' as keyof typeof translations}
      header={'course-applicant-approve-header' as keyof typeof translations}
      footer={'course-applicant-approve-footer' as keyof typeof translations}

      data={approved ? [] : []}
      {...props}
    />
  )
}

export default CourseApplicantApprove
