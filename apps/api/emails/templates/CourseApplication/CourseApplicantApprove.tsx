import React, { FC } from 'react'
import CourseApplicantLayout, {
  CourseApplicantBaseProps,
} from './CourseApplicantLayout'
import { getTranslate } from '../../utils/getTranslate'

const CourseApplicantApprove: FC<CourseApplicantBaseProps> = ({
  application,
  t = getTranslate('en').t,
}) => {
  if (application?.approvalStatus === 'approved')
    return (
      <CourseApplicantLayout
        preview="course-applicant-approved-preview"
        header={
          !!application?.course?.price
            ? 'course-applicant-approved-header-price'
            : 'course-applicant-approved-header-no-price'
        }
        footer="course-applicant-approved-footer"
        course={application?.course}
        t={t}
        noButton
        applicant={application?.profile}
        date={application?.updatedAt}
      />
    )

  return (
    <CourseApplicantLayout
      preview="course-applicant-rejected-preview"
      header="course-applicant-rejected-header"
      footer="course-applicant-rejected-footer"
      course={application?.course}
      t={t}
      noButton
      applicant={application?.profile}
      date={application?.updatedAt}
    />
  )
}

export default CourseApplicantApprove
