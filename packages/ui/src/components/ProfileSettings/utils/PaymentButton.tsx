import { FC } from "react"

import { useToast, Button } from "@chakra-ui/react"



type PaymentButtonProps = {
  amount: number
  onPayment?: () => void
}

export const PaymentButton: FC<PaymentButtonProps> = ({ amount }) => {
  const toast = useToast()
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

  return (
    <Button
      colorScheme="primary"
      size="lg"
      variant={'outline'}
      onClick={makePayment}
    >
      Pay {amount} euro
    </Button>
  )
}
