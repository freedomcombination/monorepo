import { Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useHashtagContext } from '../HashtagProvider'

export const HashtagStats = () => {
  const { hashtagStats } = useHashtagContext()

  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Stack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats[locale].totalSentences}</Text>
        <Text>{t('post.total-content')}</Text>
      </VStack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats[locale].unsharedCount}</Text>
        <Text>{t('post.remaining-content')}</Text>
      </VStack>
      <VStack p={8} borderWidth={1} bg={'white'}>
        <Text fontSize={'4xl'}>{hashtagStats[locale].totalShares}</Text>
        <Text>{t('post.total-shares')}</Text>
      </VStack>
    </Stack>
  )
}
