import { Badge, Stack, Wrap, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import type { ApprovalStatus, Course, CourseApplication } from '@fc/types'
import { CourseLogic } from '@fc/utils/courseLogic'
import { formatPrice } from '@fc/utils/formatPrice'

import type { WTableProps } from '../../components/WTable'

export const useCourseApplicationColumns =
  (): WTableProps<CourseApplication>['columns'] => {
    const { t } = useTranslation()

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
        accessorKey: 'payments',
        transform: (value, application) => {
          const payments = value as CourseApplication['payments']
          const course = application?.course

          if (course) {
            if (!course.price) return t('course.payment.free')

            const courseLogic = new CourseLogic(
              course,
              [application!],
              application!.profile!,
            )

            return (
              <Stack>
                {courseLogic.myInstallments.length > 1 && (
                  <Wrap gap={1}>
                    {courseLogic.myInstallments.map(installment => (
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
                )}
                <Text>
                  {formatPrice(courseLogic.getTotalPaid())} /{' '}
                  {formatPrice(courseLogic.getTotalPrice())}
                </Text>
              </Stack>
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
        accessorKey: 'course',
        transform: value => (value as Course)?.title_nl,
      },
    ]
  }
