import { useContext } from 'react'

import { CourseContext } from './CourseContext'
import { CourseContextProps } from './types'

export const useCourseContext = () =>
  useContext<CourseContextProps>(CourseContext)
