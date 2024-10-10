import { FC } from 'react'

import { CourseLogic } from '@fc/utils/courseLogic'

import { ProfileCourseAssignmentDetails } from './ProfileCourseAssignmentDetails'
import { ProfileCoursePaymentDetails } from './ProfileCoursePaymentDetails'
import { StatusRejected } from './StatusRejected'

type ProfileCourseDetailsProps = {
  courseLogic: CourseLogic
  onSave: () => void
}

export const ProfileCourseDetails: FC<ProfileCourseDetailsProps> = ({
  courseLogic,
  onSave,
}) => {
  const isRejected = courseLogic.isRejected()
  if (isRejected) return <StatusRejected reason={isRejected} />

  if (courseLogic.isAssignmentInProgress())
    return (
      <ProfileCourseAssignmentDetails
        courseLogic={courseLogic}
        onSave={onSave}
      />
    )

  if (courseLogic.shouldShowPaymentDetails())
    return <ProfileCoursePaymentDetails courseLogic={courseLogic} />

  return null
}
