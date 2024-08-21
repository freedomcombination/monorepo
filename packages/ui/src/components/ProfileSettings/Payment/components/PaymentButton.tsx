import { FC } from 'react'

import { HStack, Text, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { isPast } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MdOutlinePayment, MdOutlineWarning } from 'react-icons/md'

import { SITE_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { Course, CourseApplication } from '@fc/types'
import { formatDate } from '@fc/utils'

type PaymentButtonProps = {
  amount: number
  date?: Date | string | number
  installmentNumber: number
  application: CourseApplication
  course: Course
  onPayment?: () => void
}

export const PaymentButton: FC<PaymentButtonProps> = ({
  amount,
  installmentNumber,
  application,
  course,
  date,
}) => {
  const toast = useToast()
  const past = date ? isPast(date) : false
  const { locale } = useRouter()
  const { profile, token } = useAuthContext()
  const { t } = useTranslation()

  const makePayment = async () => {
    if (profile === null || token === null) return

    const fetchAsync = async () => {
      try {
        const result = await axios.post('/api/course-payment', {
          amount,
          name: application.name,
          email: application.email,
          type: 'one-time',
          profile: profile.id,
          courseApplication: application.id,
          returnUrl: `${SITE_URL}/profile?tab=courses&slug=${course.slug}&`,
          installmentNumber,
          token,
        })

        window.location = result.data
      } catch (e) {
        console.error('request course payment error', e)
        toast({
          title: t('payment.dialog.unknown.title'),
          description: t('payment.dialog.unknown.description'),
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }

    fetchAsync()
  }

  return (
    <HStack
      onClick={makePayment}
      cursor={'pointer'}
      spacing={6}
      justifyContent={'flex-start'}
      borderWidth={1}
      borderRadius={'md'}
      borderColor={past ? 'red' : 'primary'}
      minWidth={'220px'}
      px={4}
      py={3}
    >
      {past ? (
        <MdOutlineWarning size={24} color={'red'} />
      ) : (
        <MdOutlinePayment size={24} />
      )}

      <VStack alignItems={'flex-start'} spacing={2}>
        {!!date && (
          <Text fontSize={'sm'}>
            {formatDate(date, 'dd MMMM yyyy', locale)}
          </Text>
        )}
        <Text fontSize={'xl'}>
          {t('course.payment.title.pay-euro', { amount })}
        </Text>
      </VStack>
    </HStack>
  )
}
