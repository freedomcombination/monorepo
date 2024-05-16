import { HStack, Stack, Text } from '@chakra-ui/react'
import { format } from 'date-fns'

import { Observation } from '@fc/types'

import { ObservationEditForm } from '../ObservationEditForm'

export type ObservationListItemProps = Pick<
  Observation,
  'content' | 'createdAt' | 'creator'
> & { onSuccess?: () => void; id: number; onCancel?: () => void }

export const ObservationListItem = ({
  id,
  content,
  createdAt,
  creator,
  onSuccess,
}: ObservationListItemProps) => {
  const createdDate = format(createdAt, 'dd-MM-yyyy HH:mm')

  return (
    <Stack p={2} borderWidth={1} rounded={'md'}>
      <HStack>
        <Text fontWeight={600} fontSize={'sm'}>
          {creator?.name}
        </Text>
        <Text fontSize={'sm'}>{createdDate}</Text>
      </HStack>
      <ObservationEditForm onSuccess={onSuccess} content={content} id={id} />
    </Stack>
  )
}
