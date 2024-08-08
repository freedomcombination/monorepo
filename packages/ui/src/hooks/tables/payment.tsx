import { useRouter } from 'next/router'

import { CourseApplication, CoursePayment, Profile } from '@fc/types'

import { WTableProps } from '../../components'

export const usePaymentColumns = (): WTableProps<CoursePayment>['columns'] => {
  const { locale } = useRouter()

  return {
    profile: {
      type: 'image',
      transform: value => (value as Profile)?.avatar as any,
    },
    id: { sortable: true },
    email: { sortable: true },
    status: { sortable: true },
    amount: { sortable: true },
    paymentDatetime: { sortable: true },
    courseApplication: {
      transform(value) {
        const courseApplication = value as CourseApplication
        const course = courseApplication.course

        return course?.[`title_${locale}`] ?? ''
      },
    },
  }
}
