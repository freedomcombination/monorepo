import { FC } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Button,
  Link,
} from '@chakra-ui/react'
import { FaLink } from 'react-icons/fa6'

type DonationResultAlertProps = {
  status: AlertProps['status']
  title: string
  description: string
  slug?: string
}

export const DonationResultAlert: FC<DonationResultAlertProps> = ({
  status,
  title,
  description,
  slug,
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
    {slug && (
      <AlertDescription maxWidth="sm">
        <Link href={`/courses/${slug}`}>
          <Button variant={'outline'} leftIcon={<FaLink />}>
            Go back to Course
          </Button>
        </Link>
      </AlertDescription>
    )}
  </Alert>
)
