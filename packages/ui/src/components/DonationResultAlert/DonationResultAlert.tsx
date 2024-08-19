import { FC } from 'react'

import { Box } from '@chakra-ui/react'

import { Alert, AlertProps } from '@fc/chakra'

type DonationResultAlertProps = {
  status: AlertProps['status']
  title: string
  description: string
}

export const DonationResultAlert: FC<DonationResultAlertProps> = ({
  status,
  title,
  description,
}) => (
  <Alert
    status={status}
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    height="200px"
    title={title}
  >
    {title}
    <Box maxWidth="sm">{description}</Box>
  </Alert>
)
