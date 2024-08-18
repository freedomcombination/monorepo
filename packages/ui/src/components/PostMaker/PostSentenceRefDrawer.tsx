import { FC } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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

import { useStrapiRequest } from '@fc/services'
import { ArchiveContent } from '@fc/types'

import { useHashtagContext } from '../../components/HashtagProvider'

export const PostSentenceRefDrawer = () => {
  const { sentence } = useHashtagContext()
  const { data, loading } = useStrapiRequest<ArchiveContent>({
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

      {loading || !archiveContent ? (
        <LoadingInfo loading={loading} />
      ) : (
        <Stack background={'white'} borderRadius={'lg'} p={4} gap={4}>
          <Heading size={'md'} fontWeight={'bold'} color="gray.700">
            {archiveContent.title}
          </Heading>
          <HStack>
            <Link isExternal href={archiveContent.link}>
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
