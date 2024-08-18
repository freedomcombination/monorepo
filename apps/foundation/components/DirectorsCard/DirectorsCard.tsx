import { FC } from 'react'

import { Stack, Text } from '@chakra-ui/react'

interface DirectorsCardProps {
  title: string
  name: string
}

export const DirectorsCard: FC<DirectorsCardProps> = ({ title, name }) => {
  return (
    <Stack p={4} gap={4} bg="white" rounded="lg" shadow="base">
      <Stack>
        <Text fontWeight={600}>{title}</Text>
        <Text fontSize="sm">{name}</Text>
      </Stack>
    </Stack>
  )
}
