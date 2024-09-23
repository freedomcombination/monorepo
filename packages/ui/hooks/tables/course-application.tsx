import { Badge, HStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import type { ApprovalStatus, Course, CourseApplication } from '@fc/types'
import { formatPrice } from '@fc/utils/formatPrice'

import { PaidBadges } from '../../components/PaidBadges'
import { calculateInstallments } from '../../components/ProfileSettings/Payment/utils/calculateInstallments'
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
          const colorPalettes = {
            approved: 'green',
            pending: 'yellow',
            rejected: 'red',
          }

          return {
            variant: 'outline',
            colorPalette: colorPalettes[value as ApprovalStatus],
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
              <HStack wrap={'wrap'} gap={1}>
                {installments.map(installment => (
                  <Badge
                    key={installment.installmentNumber}
                    colorPalette={installment.payment ? 'green' : 'red'}
                    variant={installment.payment ? 'solid' : 'outline'}
                    w={5}
                    h={5}
                  >
                    {installment.installmentNumber}
                  </Badge>
                ))}
              </HStack>
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
        transformPDF: value => (value ? t('paid') : t('not-paid')),
      },
      { accessorKey: 'course', transform: value => (value as Course).title_nl },
    ]
  }
