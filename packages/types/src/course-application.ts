import { ApprovalStatus } from './common'
import { Course } from './course'
import { CoursePayment } from './course-payment'
import { UploadFile } from './file'
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
  installmentInterval?: number | null
  installmentStartAfter?: string | null
  lastUpdateDate?: string | null
} & CourseApplicationUnpaid

export type CourseApplicationUnpaid = {
  paymentExplanation: string | null
}

type CourseApplicationRelation = {
  course?: Course
  profile?: Profile
  payments?: CoursePayment[]
  submittedAssignmentFiles?: UploadFile[]
}

export type CourseApplicationCreateInput = Omit<
  CourseApplicationBase,
  | 'hasPaid'
  | 'approvalStatus'
  | 'notes'
  | 'installmentCount'
  | 'installmentInterval'
  | 'installmentStartAfter'
  | 'paymentExplanation'
  | 'assignmentFilesUploaded'
> & {
  course: number
  profile: number
  notes?: string
}

export type CourseApplication = StrapiBase &
  CourseApplicationBase &
  CourseApplicationRelation
