import { FC, PropsWithChildren } from 'react'

import {
  Badge,
  Box,
  Center,
  HStack,
  Heading,
  Stack,
  Text,
  Group,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Markdown from 'react-markdown'

import { Popover, PopoverContent, PopoverTrigger } from '@fc/chakra'
import { useStrapiRequest } from '@fc/services'
import { ArchiveContent } from '@fc/types'

import { useGenPostContext } from '../GenPostProvider'

type ArchivePopoverProps = PropsWithChildren<{
  archiveId: number
  includeContent?: boolean
}>

export const ArchivePopover: FC<ArchivePopoverProps> = ({
  archiveId,
  children,
  includeContent = false,
}) => {
  const { getArchive } = useGenPostContext()

  const archiveContent = getArchive(archiveId)

  return (
    <Popover positioning={{ placement: 'top' }}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        {archiveContent ? (
          <DisplayArchive
            archiveContent={archiveContent}
            includeContent={includeContent}
          />
        ) : (
          <FetchArchive id={archiveId} includeContent={includeContent} />
        )}
      </PopoverContent>
    </Popover>
  )
}

const FetchArchive: FC<{
  id: number
  includeContent: boolean
}> = ({ id, includeContent }) => {
  /*
        In post-maker
        we use this component and there is no GenPostProvider that encapsulate it
        we need to fetch the archive content manually
    */

  const { data, isLoading } = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    id,
    queryOptions: {
      enabled: !!id,
    },
  })

  const archiveContent = data?.data

  if (isLoading || !archiveContent)
    return (
      <Center>
        {isLoading ? (
          <Text>Archive with id {id} is loading...</Text>
        ) : id ? (
          <Text>Archive with id {id} not found.</Text>
        ) : (
          <Text>No archive id provided.</Text>
        )}
      </Center>
    )

  return (
    <DisplayArchive
      archiveContent={archiveContent}
      includeContent={includeContent}
    />
  )
}

const DisplayArchive: FC<{
  archiveContent: ArchiveContent
  includeContent: boolean
}> = ({ archiveContent, includeContent }) => {
  const { locale } = useRouter()

  return (
    <Link target="_blank" rel="noreferrer noopener" href={archiveContent.link}>
      <Stack p={2} gap={2} textAlign={'left'} color={'gray.500'}>
        <Heading size="sm" color={'gray.500'}>
          {archiveContent.title}
        </Heading>
        <Box>
          <HStack fontSize={'sm'} fontWeight={300}>
            <Text>{archiveContent.source}</Text>
            <Text>•</Text>
            <time>{archiveContent.date}</time>
          </HStack>
          <Group wrap={'wrap'} fontWeight={300} align={'center'}>
            {archiveContent.categories &&
              archiveContent.categories.length > 0 &&
              archiveContent.categories.map(c => (
                <Badge key={c.id}>{c[`name_${locale}`]}</Badge>
              ))}
          </Group>
        </Box>
        {includeContent && (
          <Box lineClamp={6} overflow={'auto'}>
            <Markdown>{archiveContent.content}</Markdown>
          </Box>
        )}
      </Stack>
    </Link>
  )
}
