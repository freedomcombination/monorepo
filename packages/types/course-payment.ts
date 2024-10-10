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
  installmentNumber: number
}

type PaymentRelation = {
  profile: Profile
  courseApplication: CourseApplication
}

export type CoursePaymentCreateInput = Pick<
  PaymentBase,
  'name' | 'email' | 'amount' | 'installmentNumber'
> & {
  profile: number
  courseApplication: number
}

export type PaymentUpdateInput = Pick<
  PaymentBase,
  'status' | 'checkoutSessionId'
>

export type PaymentCreateInputManual = CoursePaymentCreateInput &
  PaymentUpdateInput &
  Pick<PaymentBase, 'paymentDatetime'>

export type CoursePayment = PaymentBase & PaymentRelation & StrapiBase
