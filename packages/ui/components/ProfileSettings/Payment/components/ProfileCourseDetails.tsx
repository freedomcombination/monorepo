import { FC } from 'react'

import { CourseLogic } from '@fc/utils/courseLogic'

import { ProfileCourseAssignmentDetails } from './ProfileCourseAssignmentDetails'
import { ProfileCoursePaymentDetails } from './ProfileCoursePaymentDetails'
import { StatusRejected } from './StatusRejected'

type ProfileCourseDetailsProps = {
  courseLogic: CourseLogic
}

export const ProfileCourseDetails: FC<ProfileCourseDetailsProps> = ({
  courseLogic,
}) => {
  if (courseLogic.isRejected()) return <StatusRejected />

  if (courseLogic.isAssignmentInProgress())
    return <ProfileCourseAssignmentDetails courseLogic={courseLogic} />

  if (courseLogic.shouldShowPaymentDetails())
    return <ProfileCoursePaymentDetails courseLogic={courseLogic} />

  return null
}
