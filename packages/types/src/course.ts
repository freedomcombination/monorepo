import { ApprovalStatus, Expand } from './common'
import { CourseApplication } from './course-application'
import { Curriculum } from './curriculum'
import { FaqLocale } from './faq-locale'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { Platform } from './platform'
import { StrapiBase } from './strapi'
import { Tag } from './tag'

type CourseBase = StrapiBase & {
  title: string
  slug: string
  description: string
  content: string
  language: StrapiLocale
  location: string
  instructor: string
  quota: number | null
  price: number | null
  approvalStatus: ApprovalStatus | null
  isOnline: boolean
  startDate: string
  endDate: string
}

type CourseRelation = {
  image?: UploadFile | null
  tags?: Tag[]
  applications?: CourseApplication[]
  localizations?: Array<Course>
  faqs?: FaqLocale[]
  curriculum?: Curriculum[]
  platform?: Platform | null
}

// Remove approvalStatus from CourseCreateInput since it will be set when an editor approves the course
export type CourseCreateInput = {
  image: File
  tags?: number[]
  faqs?: FaqLocale[] // Component, not a relation
  curriculum?: Curriculum[] // Component, not a relation
  platform?: number
} & Expand<
  { publishedAt?: Date | string | null } & Omit<CourseBase, 'approvalStatus'>
>

export type CourseUpdateInput = CourseBase &
  Partial<Omit<CourseBase, 'locale'>> & {
    image?: File
    tags?: number[]
    faqs?: FaqLocale[] // Component, not a relation
    curriculum?: Curriculum[] // Component, not a relation
    platform?: number
    publishedAt?: Date | string | null
  }

export type CourseLocalizeInput = Pick<
  CourseBase,
  'title' | 'description' | 'content'
>

export type Course = CourseBase & CourseRelation
