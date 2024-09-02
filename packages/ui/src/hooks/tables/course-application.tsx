import { Badge, Wrap } from '@chakra-ui/react'

import { ApprovalStatus, Course, CourseApplication } from '@fc/types'
import { formatPrice } from '@fc/utils'

import { paidBadgesPDF } from './utils'
import { PaidBadges, WTableProps } from '../../components'
import { calculateInstallments } from '../../components/ProfileSettings/Payment/utils/calculateInstallments'

export const useCourseApplicationColumns =
  (): WTableProps<CourseApplication>['columns'] => {
    return [
      { accessorKey: 'name', sortable: true },
      {
        accessorKey: 'approvalStatus',
        type: 'badge',
        componentProps: value => {
          const colorScheme = {
            approved: 'green',
            pending: 'yellow',
            rejected: 'red',
          }

          return {
            variant: 'outline',
            colorScheme: colorScheme[value as ApprovalStatus],
          }
        },
      },
      { accessorKey: 'city', sortable: true },
      {
        accessorKey: 'email',
      },
      {
        accessorKey: 'phone',
      },
      { accessorKey: 'country', sortable: true },
      {
        accessorKey: 'installmentCount',
      },
      {
        accessorKey: 'payments',
        transform: (value, application) => {
          const payments = value as CourseApplication['payments']

          if (
            application?.installmentCount &&
            application.installmentCount > 1
          ) {
            const installments = calculateInstallments(
              application.installmentCount,
              application.createdAt,
              0,
              payments?.filter(payment => payment.status === 'paid') ?? [],
            )

            return (
              <Wrap gap={1}>
                {installments.map(installment => (
                  <Badge
                    key={installment.installmentNumber}
                    colorScheme={installment.payment ? 'green' : 'red'}
                    variant={installment.payment ? 'solid' : 'outline'}
                    w={5}
                    h={5}
                  >
                    {installment.installmentNumber}
                  </Badge>
                ))}
              </Wrap>
            )
          }
          const totalAmount =
            payments?.reduce(
              (total, payment) =>
                payment.status === 'paid' ? total + payment.amount : total,
              0,
            ) ?? 0

          return `${formatPrice(totalAmount)}`
        },
      },
      {
        accessorKey: 'hasPaid',
        transform: (value, application) => {
          const getPaidStatus = () => {
            if (value) return 'paid'

            if (!application?.course) return value ? 'paid' : 'not yet'

            const course = application.course as Course
            const price = course.price

            if (price == 0) return 'free'

            const totalAmount =
              application.payments?.reduce(
                (total, payment) =>
                  payment.status === 'paid' ? total + payment.amount : total,
                0,
              ) ?? 0

            if (price === totalAmount) return 'paid'

            return 'not yet'
          }

          return <PaidBadges status={getPaidStatus()} />
        },
        transformPDF: value => paidBadgesPDF(value as boolean | null),
      },
      { accessorKey: 'course', transform: value => (value as Course).title_nl },
    ]
  }
