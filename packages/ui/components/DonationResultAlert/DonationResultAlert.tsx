import { FC } from 'react'

import { Box, Button, Link } from '@chakra-ui/react'
import { FaLink } from 'react-icons/fa6'

import { Alert, AlertProps } from '@fc/chakra'

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
    title={title}
  >
    {title}
    <Box maxWidth="sm">
      <Box>{description}</Box>
      {slug && (
        <Link href={`/courses/${slug}`}>
          <Button variant={'outline'}>
            <FaLink />
            Go back to Course
          </Button>
        </Link>
      )}
    </Box>
  </Alert>
)
