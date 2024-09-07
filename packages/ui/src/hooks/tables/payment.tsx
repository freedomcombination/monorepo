import { useRouter } from 'next/router'

import { CourseApplication, CoursePayment, Profile } from '@fc/types'

import { WTableProps } from '../../components'

export const usePaymentColumns = (): WTableProps<CoursePayment>['columns'] => {
  const { locale } = useRouter()

  return [
    {
      accessorKey: 'profile',
      type: 'image',
      transform: value => (value as Profile)?.avatar as any,
    },
    {
      accessorKey: 'id',
      sortable: true,
    },
    {
      accessorKey: 'email',
      sortable: true,
    },
    {
      accessorKey: 'status',
      sortable: true,
    },
    {
      accessorKey: 'amount',
      sortable: true,
      transform: value => `${value} €`,
    },
    {
      accessorKey: 'installmentNumber',
    },
    {
      accessorKey: 'paymentDatetime',
      sortable: true,
      type: 'date',
      componentProps() {
        return { format: 'dd MMMM yy - HH:mm' }
      },
    },
    {
      accessorKey: 'courseApplication',
      transform(value) {
        const courseApplication = value as CourseApplication
        const course = courseApplication.course

        return course?.[`title_${locale}`] ?? ''
      },
    },
  ]
}
