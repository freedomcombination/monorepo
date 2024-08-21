import { ApprovalStatus, Course, CourseApplication } from '@fc/types'

import { paidBadgesPDF } from './utils'
import { PaidBadges, WTableProps } from '../../components'

export const useCourseApplicationColumns =
  (): WTableProps<CourseApplication>['columns'] => {
    return {
      name: { sortable: true },
      approvalStatus: {
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
      city: { sortable: true },
      email: {},
      phone: {},
      country: { sortable: true },
      installmentCount: {},
      payments: {
        transform: value => {
          const payments = value as CourseApplication['payments']
          const totalAmount =
            payments?.reduce(
              (total, payment) =>
                payment.status === 'paid' ? total + payment.amount : total,
              0,
            ) ?? 0

          return `${totalAmount} €`
        },
      },
      hasPaid: {
        transform: value => <PaidBadges hasPaid={value as boolean | null} />,
        transformPDF: value => paidBadgesPDF(value as boolean | null),
      },
      course: { transform: value => (value as Course).title_nl },
    }
  }
