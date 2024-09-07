import React from 'react'

import { Course, CourseApplication } from '@fc/types'

type CourseContextProps = {
  course: Course
  applications: CourseApplication[]
  myApplication?: CourseApplication
  paidApplications?: CourseApplication[]
  isLoading: boolean
  refetchApplicants: () => void
}

export const CourseContext = React.createContext<CourseContextProps>(
  {} as CourseContextProps,
)
export const useCourseContext = () =>
  React.useContext<CourseContextProps>(CourseContext)
