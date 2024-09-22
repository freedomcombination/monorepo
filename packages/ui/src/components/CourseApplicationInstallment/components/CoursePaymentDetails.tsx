import React, { FC } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { addDays, isPast } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaStripe } from 'react-icons/fa6'
import { TbCash } from 'react-icons/tb'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { CoursePayment, PaymentUpdateInputExt, Profile } from '@fc/types'
import {
  CourseLogic,
  formatDate,
  formatPrice
} from '@fc/utils'

import { I18nNamespaces } from '../../../../@types/i18next'
import { KeyValue } from '../../KeyValueView'
import { CourseApplicationDetailsProps } from '../CourseApplicationDetails'

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
  const { profile, token } = useAuthContext()
  const toast = useToast()
  const [isOpen, setIsOpen] = React.useState(false)
  const cancelRef = React.useRef(null)
  const { t } = useTranslation()
  const [paymentParams, setPaymentParams] = React.useState<{
    price: number
    installmentNumber: number
  } | null>(null)
  const paidInstallments = logicCourse.myInstallments.filter(i => !!i.payment)
  const allUnPaid = logicCourse.myInstallments.filter(i => !i.payment)
  const dueInstallments = allUnPaid.filter(i => isPast(addDays(i.date, 7)))
  const unPaidInstallments = allUnPaid.filter(
    i =>
      !dueInstallments.some(
        due => due.installmentNumber === i.installmentNumber,
      ),
  )

  const onPaymentWithCash = async () => {
    if (!paymentParams) return
    const { price, installmentNumber } = paymentParams
    try {
      if (!token || !profile || !profile.email)
        throw new Error('You need valid profile with email...')

      await Mutation.post<
        CoursePayment,
        PaymentUpdateInputExt
      >(
        'payments',
        {
          name: application.name,
          email: application.email,
          amount: price,
          profile: application.profile!.id,
          courseApplication: application.id,
          installmentNumber,
          checkoutSessionId: profile.email,
          status: 'paid',
          paymentDatetime: new Date().toISOString(),
        },
        token,
      )

      toast({
        title: 'Payment successful',
        description: 'Thank you for your payment',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      onSave()
      setIsOpen(false)
    } catch (error) {
      toast({
        title: 'Payment failed',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const setParams = (installmentNumber: number, price: number) => {
    setPaymentParams({ installmentNumber, price })
    setIsOpen(true)
  }

  return (
    <Stack spacing={2} borderWidth={1} borderRadius={'lg'} p={4}>
      <KeyValue tKey="course.applicant.details.installment.kv.course-fee">
        {formatPrice(course.price!)}
      </KeyValue>
      <PaymentRow
        tKey="course.payment.title.installment-overdue"
        installments={dueInstallments}
        setParams={setParams}
      />
      <PaymentRow
        tKey="course.payment.title.installment-paid"
        installments={paidInstallments}
        setParams={setParams}
      />
      <PaymentRow
        tKey="course.payment.title.installment-unpaid"
        installments={unPaidInstallments}
        setParams={setParams}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('course.payment.title.nth-installment', {
                number: paymentParams?.installmentNumber
              })} : {formatPrice(paymentParams?.price ?? 0)}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t('course.applicant.details.explain.warn')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                {t('cancel')}
              </Button>
              <Button
                colorScheme="red"
                onClick={onPaymentWithCash}
                ml={3}
              >
                {t('course.payment.title.pay')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  )
}

const PaymentRow = ({
  installments,
  tKey,
  setParams,
}: {
  installments: CourseLogic['myInstallments']
  tKey: keyof I18nNamespaces['common']
    setParams: (installment: number, price: number) => void
}) => {
  const total = installments.reduce((acc, cur) => acc + cur.amount, 0)
  const { locale } = useRouter()
  const { t } = useTranslation()
  if (!total) return null

  const takePayment = installments.some(installment => !installment.payment)
  const color = !takePayment
    ? 'green.600'
    : isPast(installments[0].date)
      ? 'red.500'
      : 'gray.500'

  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
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
                <VStack align={'flex-end'}>
                  {installment.payment && <Tooltip label={installment.payment?.checkoutSessionId}>
                    <IconButton
                      variant={'ghost'}
                      p={0}
                      rounded={'full'}
                      icon={isValidEmail(installment.payment.checkoutSessionId) ? <TbCash /> : <FaStripe />} aria-label={''} />
                  </Tooltip>}
                  <Heading size={'lg'} color={color}>
                    #{installment.installmentNumber}
                  </Heading>
                </VStack>
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
                  onClick={() => setParams(installment.installmentNumber, installment.amount)}
                >
                  {t('course.payment.title.installment.pay-cash')}
                </Button>
              )}
            </VStack>
          ))}
        </SimpleGrid>
      </Stack>
    </KeyValue>
  )
}
