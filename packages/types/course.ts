import { Category } from './category'
import { ApprovalStatus } from './common'
import { CourseApplication } from './course-application'
import { Curriculum } from './curriculum'
import { FaqLocale } from './faq-locale'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { Platform } from './platform'
import { StrapiBase } from './strapi'

type CourseBase = StrapiBase & {
  title_en: string
  title_tr: string
  title_nl: string
  slug: string
  description_en: string
  description_tr: string
  description_nl: string
  content_en: string
  content_tr: string
  content_nl: string
  language: StrapiLocale
  location: string
  instructor: string
  quota: number | null
  price: number | null
  approvalStatus: ApprovalStatus | null
  isOnline: boolean
  startDate: string
  endDate: string
  lastRegisterDate: string
  requireApproval: boolean
  assignmentSubmissionDeadline?: number
  assignmentEvaluationTime?: number
}

type CourseRelation = {
  image?: UploadFile | null
  categories?: Category[]
  assignmentFiles?: UploadFile[]
  applications?: CourseApplication[]
  faqs?: FaqLocale[]
  curriculum?: Curriculum[]
  platform?: Platform | null
}

// Remove approvalStatus from CourseCreateInput since it will be set when an editor approves the course
export type CourseCreateInput = Omit<CourseBase, 'approvalStatus'> & {
  image: File
  categories?: number[]
  faqs?: FaqLocale[] // Component, not a relation
  curriculum?: Curriculum[] // Component, not a relation
  assignmentFiles?: File[]
  platform?: number
}

export type CourseUpdateInput = CourseBase & {
  image?: File
  categories?: number[]
  faqs?: FaqLocale[] // Component, not a relation
  curriculum?: Curriculum[] // Component, not a relation
  assignmentFiles?: File[]
  platform?: number
}

export type Course = CourseBase & CourseRelation
