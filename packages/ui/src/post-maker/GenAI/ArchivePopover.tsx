import { FC, PropsWithChildren } from 'react'

import {
  Badge,
  Link,
  Text,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Wrap,
  Center,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@fc/services'
import { ArchiveContent } from '@fc/types'

import { useGenPostContext } from './GenPostProvider'

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
    <Popover
      placement="top"
      trigger={archiveContent || !archiveId ? 'hover' : 'click'}
    >
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
    <List p={2} spacing={2} textAlign={'left'}>
      <ListItem fontWeight="bold">{archiveContent.title}</ListItem>
      <ListItem color={'gray.500'}>{archiveContent.source}</ListItem>
      <ListItem color={'gray.500'}>
        <Link isExternal href={archiveContent.link}>
          {archiveContent.link}
        </Link>
      </ListItem>
      {includeContent && (
        <ListItem noOfLines={6} overflow={'auto'}>
          <Text>{archiveContent.content}</Text>
        </ListItem>
      )}
      {archiveContent.categories && archiveContent.categories.length > 0 && (
        <ListItem>
          <Wrap>
            {archiveContent.categories.map(c => (
              <Badge key={c.id}>{c[`name_${locale}`]}</Badge>
            ))}
          </Wrap>
        </ListItem>
      )}
    </List>
  )
}
