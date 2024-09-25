import { FC } from 'react'

import {
  Box,
  Center,
  HStack,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { HiOutlineExternalLink } from 'react-icons/hi'
import Markdown from 'react-markdown'

import { Alert } from '@fc/chakra'
import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { ArchiveContent } from '@fc/types'

import { useHashtagContext } from '../HashtagProvider'

export const PostSentenceRefDrawer = () => {
  const { sentence } = useHashtagContext()
  const { data, isLoading } = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    id: 2,
    queryOptions: {
      enabled: true,
    },
  })

  const archiveContent = data?.data

  if (!sentence) return null

  return (
    <Stack gap={4}>
      {sentence.value && (
        <Stack background={'white'} borderRadius={'lg'} p={4}>
          <Text>{sentence.value}</Text>
        </Stack>
      )}

      {isLoading || !archiveContent ? (
        <LoadingInfo loading={isLoading} />
      ) : (
        <Stack background={'white'} borderRadius={'lg'} p={4} gap={4}>
          <Heading size={'md'} fontWeight={'bold'} color="gray.700">
            {archiveContent.title}
          </Heading>
          <HStack>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={archiveContent.link}
            >
              <HStack color="blue.500">
                <Text>{archiveContent.source}</Text>
                <HiOutlineExternalLink />
              </HStack>
            </Link>
            <time>{archiveContent.date}</time>
          </HStack>
          <Markdown>{archiveContent.content}</Markdown>
        </Stack>
      )}
    </Stack>
  )
}

const LoadingInfo: FC<{ loading: boolean }> = ({ loading }) => {
  const { t } = useTranslation()

  return (
    <Center
      background={'white'}
      borderRadius={'lg'}
      py={16}
      overflow={'hidden'}
    >
      {loading ? (
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
          title={t('reference')}
        >
          <Box maxWidth="sm">{t('no-reference-found')}</Box>
        </Alert>
      )}
    </Center>
  )
}
