import { FC } from 'react'

import { Badge, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ALLOW_COURSE_PAYMENT } from '@fc/config/constants'
import { CourseLogic } from '@fc/utils/courseLogic'
import { formatDate } from '@fc/utils/formatDate'
import { formatPrice } from '@fc/utils/formatPrice'

import { PaymentButton } from './PaymentButton'
import { KeyValue } from '../../KeyValueView'

const SINGLE_INSTALLMENT = 1

export const ProfileCoursePaymentDetails: FC<{
  courseLogic: CourseLogic
}> = ({ courseLogic }) => {
  const { locale, query } = useRouter()
  const { t } = useTranslation()
  const id = Number(query.id) ?? -1

  const course = courseLogic.course
  const application = courseLogic.myApplication!

  if (!ALLOW_COURSE_PAYMENT) return

  if (!course.price) return

  const remainingPrice = courseLogic.getRemainingPrice()
  if (remainingPrice === 0) {
    return (
      <KeyValue tKey={'course.payment.title.total-payment'}>
        <Text>{`${formatPrice(course.price)} euro`}</Text>
      </KeyValue>
    )
  }

  const installmentCount = application.installmentCount || SINGLE_INSTALLMENT

  if (installmentCount === SINGLE_INSTALLMENT) {
    return (
      <KeyValue tKey={'course.payment.title.pay'}>
        <PaymentButton
          amount={remainingPrice}
          installmentNumber={1}
          application={application}
          course={course}
        />
      </KeyValue>
    )
  }

  const paidInstallments = courseLogic.paidInstallments
  const unPaidInstallments = courseLogic.unPaidInstallments
  const dueUnPaidInstallments = courseLogic.dueUnPaidInstallments

  return (
    <>
      {paidInstallments.length > 0 && (
        <KeyValue tKey={'course.payment.title.installment-paid'}>
          <Stack>
            {paidInstallments.map(
              ({ date, amount, installmentNumber, payment }) => (
                <KeyValue
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
                >
                  <Text fontWeight={payment?.id === id ? 'bold' : 'normal'}>
                    {t('course.payment.title.nth-installment-paid', {
                      date: formatDate(date, 'dd MMMM yyyy', locale),
                      amount: formatPrice(amount),
                    })}
                  </Text>
                </KeyValue>
              ),
            )}
          </Stack>
        </KeyValue>
      )}
      {dueUnPaidInstallments.length > 0 && (
        <KeyValue tKey={'course.payment.title.installment-overdue'}>
          <SimpleGrid gap={2} columns={{ base: 1, md: 2, lg: 3 }}>
            {dueUnPaidInstallments.map(
              ({ date, amount, installmentNumber }) => (
                <PaymentButton
                  key={installmentNumber}
                  course={course}
                  application={application}
                  amount={amount}
                  installmentNumber={installmentNumber}
                  date={date}
                />
              ),
            )}
          </SimpleGrid>
        </KeyValue>
      )}
      {unPaidInstallments.length > 0 && (
        <KeyValue tKey={'course.payment.title.installment-unpaid'}>
          <SimpleGrid gap={2} columns={{ base: 1, md: 2, lg: 3 }}>
            {unPaidInstallments.map(({ date, amount, installmentNumber }) => (
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
        </KeyValue>
      )}
    </>
  )
}
