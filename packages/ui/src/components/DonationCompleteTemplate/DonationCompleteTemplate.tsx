import { FC } from 'react'

import { Center, Container } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { DonationResultAlert } from '../DonationResultAlert'

type DonationCompleteTemplateProps = {
  status: string
  slug?: string
}

// TODO Make transaction detail messages more user friendly
// TODO also lets rename them like PaymentCompeteTemplate so we can use them for all
export const DonationCompleteTemplate: FC<DonationCompleteTemplateProps> = ({
  status,
  slug,
}) => {
  const { t } = useTranslation()
  const renderStatus = () => {
    if (status === 'paid') {
      return (
        <DonationResultAlert
          title={t('payment.dialog.success.title')}
          description={
            slug
              ? t('payment.dialog.success.description')
              : t('payment.dialog.success.description-donation')
          }
          status="success"
          slug={slug}
        />
      )
    }

    if (status === 'unpaid') {
      return (
        <DonationResultAlert
          status="warning"
          title={t('payment.dialog.unpaid.title')}
          description={t('payment.dialog.unpaid.description')}
          slug={slug}
        />
      )
    }

    if (status === 'cancel') {
      return (
        <DonationResultAlert
          status="info"
          title={t('payment.dialog.cancelled.title')}
          description={
            slug
              ? t('payment.dialog.cancelled.description')
              : t('payment.dialog.cancelled.description-donation')
          }
          slug={slug}
        />
      )
    }
    if (status === 'Transaction not found') {
      return (
        <DonationResultAlert
          status="warning"
          title={t('payment.dialog.transaction-not-found.title')}
          description={t('payment.dialog.transaction-not-found.description')}
          slug={slug}
        />
      )
    }

    return (
      <DonationResultAlert
        status="error"
        title={t('payment.dialog.unknown.title')}
        description={t('payment.dialog.unknown.description')}
        slug={slug}
      />
    )
  }

  return (
    <Container maxWidth="container.sm">
      <Center minH="70vh">{renderStatus()}</Center>
    </Container>
  )
}
