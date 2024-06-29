import { ApprovalStatus, Course, CourseApplication } from '@fc/types'

import { PaidBadges, WTableProps } from '../../components'
import { paidBadgesPDF } from './utils'

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
      hasPaid: {
        transform: value => <PaidBadges hasPaid={value as boolean | null} />,
        transformPDF: value => paidBadgesPDF(value as boolean | null),
      },
      course: { transform: value => (value as Course).title_nl },
    }
  }
