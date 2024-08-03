import { FC } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from '../Alert'

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
  >
    <AlertIcon boxSize="40px" mr={0} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      {title}
    </AlertTitle>
    <AlertDescription maxWidth="sm">{description}</AlertDescription>
  </Alert>
)
