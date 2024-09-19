import { FC } from 'react'

import { CourseApplicationDetailsProps } from '../CourseApplicationDetails'
import { CourseApplication, Profile } from '@fc/types'
import {
  CourseLogic,
  formatDate,
  formatDateRelative,
  formatPrice,
} from '@fc/utils'
import {
  SimpleGrid,
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { addDays, endOfDay, formatRelative, isAfter, isPast } from 'date-fns'
import { t } from 'i18next'
import { KeyValue } from '../../KeyValueView'
import { I18nNamespaces } from '../../../../@types/i18next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { formatRevalidate } from 'next/dist/server/lib/revalidate'

export const CoursePaymentDetails: FC<CourseApplicationDetailsProps> = ({
  course,
  application,
  onSave = () => { },
}) => {
  const logicCourse = new CourseLogic(
    course,
    [application],
    application.profile as Profile,
  )

  const paidInstallments = logicCourse.myInstallments.filter(i => !!i.payment)
  const allUnPaid = logicCourse.myInstallments.filter(i => !i.payment)
  const dueInstallments = allUnPaid.filter(i => isPast(addDays(i.date, 7)))
  const unPaidInstallments = allUnPaid.filter(
    i =>
      !dueInstallments.some(
        due => due.installmentNumber === i.installmentNumber,
      ),
  )

  return (
    <Stack spacing={2} borderWidth={1} borderRadius={'lg'} p={4}>
      <KeyValue tKey="course.applicant.details.installment.kv.course-fee">
        {formatPrice(course.price!)}
      </KeyValue>
      <PaymentRow
        tKey="course.payment.title.installment-overdue"
        installments={dueInstallments}
      />
      <PaymentRow
        tKey="course.payment.title.installment-paid"
        installments={paidInstallments}
      />
      <PaymentRow
        tKey="course.payment.title.installment-unpaid"
        installments={unPaidInstallments}
      />
    </Stack>
  )
}

const PaymentRow = ({
  installments,
  tKey,
}: {
  installments: CourseLogic['myInstallments']
  tKey: keyof I18nNamespaces['common']
}) => {
  const total = installments.reduce((acc, cur) => acc + cur.amount, 0)
  const { locale } = useRouter()
  const { t } = useTranslation()
  const toast = useToast()
  if (!total) return null

  const takePayment = installments.some(installment => !installment.payment)
  const color = !takePayment
    ? 'green.600'
    : isPast(installments[0].date)
      ? 'red.500'
      : 'gray.500'

  const onTakePayment = () => {
    toast({
      title: t(tKey),
      description: 'yakında alacağız',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })
  }

  return (
    <KeyValue tKey={tKey}>
      <Stack>
        <KeyValue title="Total">
          <Text fontWeight={'bold'}>{formatPrice(total)}</Text>
        </KeyValue>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
          {installments.map(installment => (
            <VStack
              key={installment.installmentNumber}
              gap={1}
              borderWidth={1}
              borderRadius={'lg'}
              p={2}
            >
              <HStack gap={6}>
                <Heading size={'lg'} color={color}>
                  #{installment.installmentNumber}
                </Heading>
                <Stack>
                  <Text fontSize={'md'}>
                    {formatDate(installment.date, 'dd MMMM yyyy', locale)}
                  </Text>
                  <Text fontSize={'2xl'}>
                    {formatPrice(installment.amount)}
                  </Text>
                </Stack>
              </HStack>

              {takePayment && (
                <Button
                  variant={'solid'}
                  colorScheme="primary"
                  size={'sm'}
                  onClick={onTakePayment}
                >
                  Elden ödeme kaydet
                </Button>
              )}
            </VStack>
          ))}
        </SimpleGrid>
      </Stack>
    </KeyValue>
  )
}
