import { FC } from 'react'

import { Badge, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { isPast, subMonths } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Course, CourseApplication } from '@fc/types'
import { formatDate } from '@fc/utils'

import { PaymentButton } from './PaymentButton'
import { LineText } from './PaymentLine'
import { calculateInstallments } from '../utils/calculateInstallments'
import { calculateRemainingPrice } from '../utils/calculateRemainingPrice'

const SINGLE_INSTALLMENT = 1

export const CoursePaymentDetails: FC<{
  course: Course
  application: CourseApplication
}> = ({ course, application }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  if (!course.price) return

  const remainingPrice = calculateRemainingPrice(course, application)
  if (remainingPrice === 0) {
    return (
      <LineText title={t('course.payment.title.total-payment')} value={`${course.price} euro`} />
    )
  }

  const installmentCount = application.installmentCount || SINGLE_INSTALLMENT

  if (installmentCount === SINGLE_INSTALLMENT) {
    return (
      <LineText
        title={t('course.payment.title.pay')}
        value={<PaymentButton amount={remainingPrice} installmentNumber={1} application={application} course={course} />}
      />
    )
  }

  const successfulPayments =
    application.payments?.filter(payment => payment.status === 'paid') ?? []

  const FAKECreatedAt = subMonths(application.createdAt, 2)
  const installments = calculateInstallments(
    installmentCount,
    FAKECreatedAt,
    course.price,
    successfulPayments,
  )

  const paidInstallments = installments.filter(
    installment => installment.payment !== null,
  )
  const pastInstallments = installments.filter(
    installment => installment.payment === null && isPast(installment.date),
  )
  const unpaidInstallments = installments.filter(
    installment => installment.payment === null && !isPast(installment.date),
  )

  return (
    <>
      {paidInstallments.length > 0 && (
        <LineText
          title={t('course.payment.title.installment-paid')}
          value={
            <Stack>
              {paidInstallments.map(({ date, amount, installmentNumber }) => (
                <LineText
                  key={installmentNumber}
                  title={
                    <Badge colorScheme={'green'}>
                      {t('course.payment.title.nth-installment', { number: installmentNumber })}
                    </Badge>
                  }
                  value={
                    <Text>
                      {t('course.payment.title.nth-installment-paid', { date: formatDate(date, 'dd MMMM yyyy', locale), amount })}
                    </Text>
                  }
                />
              ))}
            </Stack>
          }
        />
      )}
      {pastInstallments.length > 0 && (
        <LineText
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
        <LineText
          title={t('course.payment.title.installment-unpaid')}
          value={
            <SimpleGrid gap={2} columns={{ base: 1, md: 2, lg: 3 }}>
              {unpaidInstallments.map(({ date, amount, installmentNumber }) => (
                <PaymentButton
                  key={installmentNumber}
                  amount={amount}
                  installmentNumber={installmentNumber}
                  date={date} application={application} course={course} />
              ))}
            </SimpleGrid>
          }
        />
      )}
    </>
  )
}
