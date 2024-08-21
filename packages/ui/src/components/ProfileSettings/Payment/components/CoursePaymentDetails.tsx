import { FC } from 'react'

import { Badge, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { isPast, subMonths } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Course, CourseApplication } from '@fc/types'
import { formatDate } from '@fc/utils'

import { PaymentButton } from './PaymentButton'
import { PaymentLine } from './PaymentLine'
import { calculateInstallments } from '../utils/calculateInstallments'
import { calculateRemainingPrice } from '../utils/calculateRemainingPrice'

const SINGLE_INSTALLMENT = 1

export const CoursePaymentDetails: FC<{
  course: Course
  application: CourseApplication
}> = ({ course, application }) => {
  const { locale, query } = useRouter()
  const { t } = useTranslation()
  const id = Number(query.id) ?? -1

  if (!course.price) return

  const remainingPrice = calculateRemainingPrice(course, application)
  if (remainingPrice === 0) {
    return (
      <PaymentLine
        title={t('course.payment.title.total-payment')}
        value={<Text>{`${course.price} euro`}</Text>}
      />
    )
  }

  const installmentCount = application.installmentCount || SINGLE_INSTALLMENT

  if (installmentCount === SINGLE_INSTALLMENT) {
    return (
      <PaymentLine
        title={t('course.payment.title.pay')}
        value={
          <PaymentButton
            amount={remainingPrice}
            installmentNumber={1}
            application={application}
            course={course}
          />
        }
      />
    )
  }

  const successfulPayments =
    application.payments?.filter(payment => payment.status === 'paid') ?? []

  const installments = calculateInstallments(
    installmentCount,
    application.createdAt,
    course.price,
    successfulPayments,
  )

  const { paidInstallments, pastInstallments, unpaidInstallments } =
    installments.reduce(
      (acc, installment) => {
        if (installment.payment !== null) {
          acc.paidInstallments.push(installment)
        } else if (isPast(installment.date)) {
          acc.pastInstallments.push(installment)
        } else {
          acc.unpaidInstallments.push(installment)
        }

        return acc
      },
      {
        paidInstallments: [] as typeof installments,
        pastInstallments: [] as typeof installments,
        unpaidInstallments: [] as typeof installments,
      },
    )

  return (
    <>
      {paidInstallments.length > 0 && (
        <PaymentLine
          title={t('course.payment.title.installment-paid')}
          value={
            <Stack>
              {paidInstallments.map(
                ({ date, amount, installmentNumber, payment }) => (
                  <PaymentLine
                    key={installmentNumber}
                    title={
                      <Badge
                        colorScheme={'green'}
                        fontWeight={payment?.id === id ? 'bold' : 'normal'}
                      >
                        {t('course.payment.title.nth-installment', {
                          number: installmentNumber,
                        })}
                      </Badge>
                    }
                    value={
                      <Text fontWeight={payment?.id === id ? 'bold' : 'normal'}>
                        {t('course.payment.title.nth-installment-paid', {
                          date: formatDate(date, 'dd MMMM yyyy', locale),
                          amount,
                        })}
                      </Text>
                    }
                  />
                ),
              )}
            </Stack>
          }
        />
      )}
      {pastInstallments.length > 0 && (
        <PaymentLine
          title={t('course.payment.title.installment-overdue')}
          value={
            <SimpleGrid gap={2} columns={{ base: 1, md: 2, lg: 3 }}>
              {pastInstallments.map(({ date, amount, installmentNumber }) => (
                <PaymentButton
                  key={installmentNumber}
                  course={course}
                  application={application}
                  amount={amount}
                  installmentNumber={installmentNumber}
                  date={date}
                />
              ))}
            </SimpleGrid>
          }
        />
      )}
      {unpaidInstallments.length > 0 && (
        <PaymentLine
          title={t('course.payment.title.installment-unpaid')}
          value={
            <SimpleGrid gap={2} columns={{ base: 1, md: 2, lg: 3 }}>
              {unpaidInstallments.map(({ date, amount, installmentNumber }) => (
                <PaymentButton
                  key={installmentNumber}
                  amount={amount}
                  installmentNumber={installmentNumber}
                  date={date}
                  application={application}
                  course={course}
                />
              ))}
            </SimpleGrid>
          }
        />
      )}
    </>
  )
}