import React, { FC } from 'react'

import {
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { isPast } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaStripe } from 'react-icons/fa6'
import { TbCash } from 'react-icons/tb'

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  Button,
  Tooltip,
  IconButton,
  toaster,
} from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { mutation } from '@fc/services/common/mutation'
import { CoursePayment, PaymentCreateInputManual } from '@fc/types'
import { CourseLogic } from '@fc/utils/courseLogic'
import { formatDate } from '@fc/utils/formatDate'
import { formatPrice } from '@fc/utils/formatPrice'

import { CourseApplicationComponentProps } from './CourseApplicationDetails'
import { I18nNamespaces } from '../../@types/i18next'
import { KeyValue } from '../KeyValueView'

export const CoursePaymentDetails: FC<CourseApplicationComponentProps> = ({
  courseLogic,
  onSave = () => {},
}) => {
  const { profile, token } = useAuthContext()
  const [isOpen, setIsOpen] = React.useState(false)
  const cancelRef = React.useRef(null)
  const { t } = useTranslation()
  const [paymentParams, setPaymentParams] = React.useState<{
    price: number
    installmentNumber: number
  } | null>(null)

  const paidInstallments = courseLogic.myInstallments.filter(i => !!i.payment)
  const dueInstallments = courseLogic.dueUnPaidInstallments
  const unPaidInstallments = courseLogic.unPaidInstallments
  const application = courseLogic.myApplication!
  const course = courseLogic.course!

  const onPaymentWithCash = async () => {
    if (!paymentParams) return
    const { price, installmentNumber } = paymentParams
    try {
      if (!token || !profile || !profile.email)
        throw new Error('You need valid profile with email...')

      await mutation<CoursePayment, PaymentCreateInputManual>({
        endpoint: 'payments',
        method: 'post',
        body: {
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
      })

      toaster.create({
        title: 'Payment successful',
        description: 'Thank you for your payment',
        type: 'success',
      })

      onSave()
      setIsOpen(false)
    } catch (error) {
      toaster.create({
        title: 'Payment failed',
        description: (error as Error).message,
        type: 'error',
      })
    }
  }

  const setParams = (installmentNumber: number, price: number) => {
    setPaymentParams({ installmentNumber, price })
    setIsOpen(true)
  }

  return (
    <Stack gap={2} borderWidth={1} borderRadius={'lg'} p={4}>
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

      <Dialog open={isOpen} onOpenChange={e => !e.open && setIsOpen(false)}>
        <DialogOverlay>
          <DialogContent>
            <DialogHeader fontSize="lg" fontWeight="bold">
              {t('course.payment.title.nth-installment', {
                number: paymentParams?.installmentNumber,
              })}{' '}
              : {formatPrice(paymentParams?.price ?? 0)}
            </DialogHeader>

            <DialogBody>
              {t('course.applicant.details.explain.warn')}
            </DialogBody>

            <DialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                {t('cancel')}
              </Button>
              <Button colorScheme="red" onClick={onPaymentWithCash} ml={3}>
                {t('course.payment.title.pay')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
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
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    )
  }

  return (
    <KeyValue tKey={tKey}>
      <Stack>
        <KeyValue title="Total">
          <Text fontWeight={'bold'}>{formatPrice(total)}</Text>
        </KeyValue>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={3}>
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
                  {installment.payment && (
                    <Tooltip content={installment.payment?.checkoutSessionId}>
                      <IconButton
                        variant={'ghost'}
                        p={0}
                        rounded={'full'}
                        icon={
                          isValidEmail(
                            installment.payment.checkoutSessionId,
                          ) ? (
                            <TbCash />
                          ) : (
                            <FaStripe />
                          )
                        }
                        aria-label={''}
                      />
                    </Tooltip>
                  )}
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
                  onClick={() =>
                    setParams(installment.installmentNumber, installment.amount)
                  }
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
