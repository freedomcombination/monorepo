import { ApprovalStatus } from './common'
import { Course } from './course'
import { CoursePayment } from './course-payment'
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
  installmentCount: number | null
} & CourseApplicationUnpaid

export type CourseApplicationUnpaid = {
  paymentExplanation: string | null
}

type CourseApplicationRelation = {
  course?: Course
  profile?: Profile
  payments?: CoursePayment[]
}

export type CourseApplicationCreateInput = Omit<
  CourseApplicationBase,
  'hasPaid' | 'approvalStatus' | 'notes'
> & {
  course: number
  profile: number
  notes?: string
}

export type CourseApplication = StrapiBase &
  CourseApplicationBase &
  CourseApplicationRelation
