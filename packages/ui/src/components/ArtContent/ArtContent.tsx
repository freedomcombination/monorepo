import { FC } from 'react'

import { Link } from '@chakra-ui/next-js'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'

import { WAvatar } from '../WAvatar'

interface ArtContentProps {
  title: string
  artistName: string
  artistAvatar?: string
  artistProfilePath: string
  description: string
}

export const ArtContent: FC<ArtContentProps> = ({
  title,
  artistName,
  artistAvatar,
  artistProfilePath,
  description,
}) => {
  return (
    <Stack p={4} spacing={4} borderRadius="sm" bg="white" boxShadow="base">
      <Heading as="h2" fontSize="3xl">
        {title}
      </Heading>

      <HStack as={Link} href={artistProfilePath}>
        <WAvatar size="sm" src={artistAvatar} name={artistName} />
        <Text fontWeight={600} lineHeight={6} fontSize="md">
          {artistName}
        </Text>
      </HStack>

      {/* TODO Does it supposed to be markdown?  */}
      <Text fontSize="md" lineHeight={6}>
        {description}
      </Text>
    </Stack>
  )
}
