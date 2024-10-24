import { ReactNode } from 'react'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { InferType } from 'yup'

import type { Course, CourseApplication, FaqLocale } from '@fc/types'
import { CourseLogic } from '@fc/utils/courseLogic'

import { applicationSchema } from './schema'

export type CourseContextProps = {
  course: Course
  applications: CourseApplication[]
  courseLogic: CourseLogic
  isLoading: boolean
  refetchApplicants: () => void
}

export type CourseDetailPageProps = {
  course: Course
  courses: Course[]
  source: MDXRemoteSerializeResult
}

export type CourseFaqItemProps = {
  item: FaqLocale
  isExpanded: boolean
}

export type CourseInfoItemProps = {
  label: string
  value: string
  icon: ReactNode
}

export type ApplicationFormFields = InferType<
  ReturnType<typeof applicationSchema>
>
