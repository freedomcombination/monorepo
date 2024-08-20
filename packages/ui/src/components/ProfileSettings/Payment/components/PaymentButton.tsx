"use client"
import { FC } from "react"

import { HStack, Text, useToast, VStack } from "@chakra-ui/react"
import { isPast } from "date-fns"
import { useRouter } from "next/router"
import { MdOutlinePayment, MdOutlineWarning } from "react-icons/md"

import { formatDate } from "@fc/utils"



type PaymentButtonProps = {
  amount: number
  date?: Date | string | number
  installmentNumber: number
  onPayment?: () => void
}

export const PaymentButton: FC<PaymentButtonProps> = ({
  amount,
  installmentNumber,
  date
}) => {
  const toast = useToast()
  const past = date ? isPast(date) : false
  const { locale } = useRouter()

  const makePayment = () => {
    // TODO: Implement payment
    // like packages\ui\src\components\CourseDetailPage\CourseApplicationPayForm.tsx line 48

    toast({
      title: 'Payment',
      description: 'Payment is not implemented yet.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }
  /*


  */

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

      {
        past ? (
          <MdOutlineWarning size={24} color={'red'} />
        ) : (
          <MdOutlinePayment size={24} />
        )
      }

      <VStack
        alignItems={'flex-start'}
        spacing={2}
      >
        {!!date && <Text fontSize={'sm'}>{formatDate(date, 'dd MMMM yyyy', locale)}</Text>}
        <Text
          fontSize={'xl'}
        >
          Pay {amount} euro
        </Text>
      </VStack>
    </HStack>
  )
}
