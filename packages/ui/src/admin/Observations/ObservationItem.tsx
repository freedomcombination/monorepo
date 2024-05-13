import { HStack, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { TbPointFilled } from 'react-icons/tb'

import { Profile } from '@fc/types'

export type ObservationItemProps = {
  content: string
  createdDate: string
  creator: Profile
}

export const ObservationItem = ({
  content,
  createdDate,
  creator,
}: ObservationItemProps) => {
  const getDate = (date: string) => {
    const newdate = format(new Date(date), 'dd-MM-yyyy HH:mm')

    return newdate
  }

  return (
    <HStack>
      <TbPointFilled />
      <Text>{content}</Text>
      <Text fontWeight={600} fontSize={'sm'}>
        {creator?.name}
      </Text>
      <Text fontSize={'sm'}>{getDate(createdDate)}</Text>
    </HStack>
  )
}
