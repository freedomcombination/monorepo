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

import { useAuthContext } from '@fc/context'
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
  const { roles } = useAuthContext()
  const allowStats =
    roles.includes('admin') ||
    roles.includes('contentmanager') ||
    roles.includes('contentmanager_translator')

  const archiveContent = data?.data

  if (sentence == null) return null

  return (
    <Stack>
      <Stack background={'white'} borderRadius={'lg'} p={2} spacing={2}>
        <Text>{t('message')} :</Text>
        <Text>{sentence.value}</Text>
      </Stack>

      {allowStats && (
        <Stack background={'white'} borderRadius={'lg'} p={2} spacing={2}>
          <Text>{t('stats')} :</Text>
          <Text>
            {t('post.total-shares')} : {sentence.shareCount}
          </Text>
        </Stack>
      )}

      {isLoading || !archiveContent ? (
        <LoadingInfo isLoading={isLoading} />
      ) : (
        <Stack background={'white'} borderRadius={'lg'} p={2} spacing={2}>
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
    <Center background={'white'} borderRadius={'lg'} p={6}>
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
          height="200px"
          background={'white'}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {t('reference')}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            No details found for this post
          </AlertDescription>
        </Alert>
      )}
    </Center>
  )
}
