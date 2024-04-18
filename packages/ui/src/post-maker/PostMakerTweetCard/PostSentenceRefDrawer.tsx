import { Center, Link, Stack, Text } from '@chakra-ui/react'
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

  const loadingInfo = () => {
    return (
      <Center background={'white'} borderRadius={'lg'} p={6}>
        {isLoading ? (
          <Text>Archive is loading...</Text>
        ) : sentence.archiveId ? (
          <Text>Archive with id {sentence.archiveId} not found.</Text>
        ) : (
          <Text>No archive id provided.</Text>
        )}
      </Center>
    )
  }

  const archiveInfo = () => {
    if (!archiveContent) return null

    return (
      <Stack background={'white'} borderRadius={'lg'} p={2} spacing={2}>
        <Text>{t('reference')} :</Text>
        <Link href={archiveContent.link} fontSize={'2xl'} fontWeight={'bold'}>
          {archiveContent.title}
        </Link>
        <Text>{archiveContent.content}</Text>
        <Text>{archiveContent.source}</Text>
      </Stack>
    )
  }

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

      {isLoading || !archiveContent ? loadingInfo() : archiveInfo()}
    </Stack>
  )
}
