import { CourseApplication } from './course-application'
import { Profile } from './profile'
import { StrapiBase } from './strapi'

type PaymentBase = {
  amount: number
  createdAt: string
  updatedAt: string
  email: string
  name: string
  status: string
  paymentDatetime: string
  checkoutSessionId: string
}

type PaymentRelation = {
  profile: Profile
  courseApplication: CourseApplication
}

export type CoursePaymentCreateInput = Pick<
  PaymentBase,
  'name' | 'email' | 'amount'
> & {
  profile: number
  courseApplication: number
}

export type PaymentUpdateInput = Pick<
  PaymentBase,
  'status' | 'checkoutSessionId'
>

export type CoursePayment = PaymentBase & PaymentRelation & StrapiBase
