import { FC } from 'react'

import { Center, Container } from '@chakra-ui/react'

import { DonationResultAlert } from '../DonationResultAlert'

type DonationCompleteTemplateProps = {
  status: string
}

// TODO Make transaction detail messages more user friendly and create translations
// TODO Add translations
export const DonationCompleteTemplate: FC<DonationCompleteTemplateProps> = ({
  status,
}) => {
  const renderStatus = () => {
    if (status === 'paid') {
      return (
        <DonationResultAlert
          title="Thank you"
          description="We received your donation"
          status="success"
        />
      )
    }

    if (status === 'unpaid') {
      return (
        <DonationResultAlert
          status="warning"
          title="Payment not completed!"
          description="It seems your payment has not been competed"
        />
      )
    }

    if (status === 'cancel') {
      return (
        <DonationResultAlert
          status="info"
          title="Cancelled"
          description="You canceled the donation"
        />
      )
    }
    if (status === 'Transaction not found') {
      return (
        <DonationResultAlert
          status="warning"
          title="Transaction not found"
          description="We could not find your transaction"
        />
      )
    }

    return (
      <DonationResultAlert
        status="error"
        title="Something went wrong"
        description="We could not process your donation"
      />
    )
  }

  return (
    <Container maxWidth="container.sm">
      <Center minH="70vh">{renderStatus()}</Center>
    </Container>
  )
}
