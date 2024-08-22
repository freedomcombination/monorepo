import { FC } from 'react'

import { Box, Center, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

export const NotFound: FC = () => {
  const { t } = useTranslation()

  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Heading size="xl" mb={4}>
          {t('not-found')}
        </Heading>
        <Text mb={4}>{t('not-found-desc')}</Text>
        <Link href="/" color="primary.500">
          {t('not-found-button')}
        </Link>
      </Box>
    </Center>
  )
}
