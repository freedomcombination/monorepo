import { ApprovalStatus } from './common'
import { Course } from './course'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

type CourseApplicationBase = {
  name: string
  email: string
  city: string | null
  country: string | null
  phone: string | null
  message: string | null
  hasPaid: boolean | null
  approvalStatus: ApprovalStatus
  notes: string | null
  paymentExplanation: string | null
}

type CourseApplicationRelation = {
  course?: Course
  profile?: Profile
}

export type CourseApplicationCreateInput = Omit<
  CourseApplicationBase,
  'hasPaid' | 'approvalStatus' | 'notes' | 'paymentExplanation'
> & {
  course: number
  profile: number
  notes?: string
}

export type CourseApplication = StrapiBase &
  CourseApplicationBase &
  CourseApplicationRelation
