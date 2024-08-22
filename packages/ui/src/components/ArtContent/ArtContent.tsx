import { FC } from 'react'

import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { WAvatar } from '../WAvatar'

type ArtContentProps = {
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
    <Stack p={4} gap={4} borderRadius="sm" bg="white" boxShadow="base">
      <Heading as="h2" fontSize="3xl">
        {title}
      </Heading>

      <Link href={artistProfilePath}>
        <HStack>
          <WAvatar size="sm" src={artistAvatar} name={artistName} />
          <Text fontWeight={600} lineHeight={6} fontSize="md">
            {artistName}
          </Text>
        </HStack>
      </Link>

      {/* TODO Does it supposed to be markdown?  */}
      <Text fontSize="md" lineHeight={6}>
        {description}
      </Text>
    </Stack>
  )
}
