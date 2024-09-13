import React from 'react'

import { CourseContextProps } from './types'

export const CourseContext = React.createContext<CourseContextProps>(
  {} as CourseContextProps,
)
