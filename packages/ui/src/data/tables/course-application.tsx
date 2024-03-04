import { ApprovalStatus, Course, CourseApplication } from '@fc/types'

import { PaidBadges } from '../../admin'
import { WTableProps } from '../../components'

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
      },
      course: { transform: value => (value as Course).title_nl },
    }
  }
