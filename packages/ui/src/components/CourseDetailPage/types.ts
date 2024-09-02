import { ReactNode } from 'react'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { InferType } from 'yup'

import { Course, FaqLocale } from '@fc/types'

import { applicationSchema } from './schema'

export type CourseDetailPageProps = {
  course: Course
  courses: Course[]
  source: MDXRemoteSerializeResult
}

export type CourseFaqItemProps = {
  item: FaqLocale
}

export type CourseInfoItemProps = {
  label: string
  value: string
  icon: ReactNode
}

export type ApplicationFormFields = InferType<
  ReturnType<typeof applicationSchema>
>
