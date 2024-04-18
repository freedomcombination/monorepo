import { FC } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useStrapiRequest } from '@fc/services'
import { ArchiveContent } from '@fc/types'

import { useHashtagContext } from '../HashtagProvider'

export const PostSentenceRefDrawer = () => {
  const { sentence } = useHashtagContext()
  const { t } = useTranslation()
  const { data, isLoading } = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    id: sentence?.archiveId ?? 0,
    queryOptions: {
      enabled: !!sentence?.archiveId,
    },
  })

  const archiveContent = data?.data

  if (sentence == null) return null

  return (
    <Stack spacing={4}>
      <Stack background={'white'} borderRadius={'lg'} p={4}>
        <Text>{sentence.value}</Text>
      </Stack>

      {isLoading || !archiveContent ? (
        <LoadingInfo isLoading={isLoading} />
      ) : (
        <Stack background={'white'} borderRadius={'lg'} p={4} spacing={2}>
          <Text>{t('reference')} :</Text>
          <Link href={archiveContent.link} fontSize={'2xl'} fontWeight={'bold'}>
            {archiveContent.title}
          </Link>
          <Text>{archiveContent.content}</Text>
          <Text>{archiveContent.source}</Text>
        </Stack>
      )}
    </Stack>
  )
}

const LoadingInfo: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { t } = useTranslation()

  return (
    <Center
      background={'white'}
      borderRadius={'lg'}
      py={16}
      overflow={'hidden'}
    >
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          background={'white'}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {t('reference')}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {t('no-reference-found')}
          </AlertDescription>
        </Alert>
      )}
    </Center>
  )
}
