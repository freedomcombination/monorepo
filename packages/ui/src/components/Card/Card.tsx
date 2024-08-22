import { FC, ReactNode } from 'react'

import {
  Center,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Group,
} from '@chakra-ui/react'
import Link from 'next/link'

import { UploadFile } from '@fc/types'

import { WAvatar } from '../WAvatar'
import { WImage } from '../WImage'

interface CardProps {
  title: string
  description: string
  image: UploadFile | null
  link: string
  rounded?: boolean
  date?: ReactNode
  place?: ReactNode
}

export const Card: FC<CardProps> = ({
  title,
  description,
  image,
  link,
  rounded,
  date,
  place,
}) => {
  const href = link?.includes('undefined') ? '' : link

  return (
    <LinkBox h={'full'}>
      <Stack
        h="full"
        bg="white"
        shadow="base"
        rounded="lg"
        overflow="hidden"
        role="group"
      >
        <Center overflow="hidden">
          {/* TODO Create shared image component */}
          {rounded ? (
            <WAvatar
              objectFit="cover"
              boxSize={48}
              src={image}
              transition="transform 0.5s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          ) : (
            <WImage
              src={image}
              alt={title}
              transition="transform 0.5s ease-in-out"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          )}
        </Center>

        <Stack flex={1} p={{ base: 4, lg: 6 }}>
          <Group wrap={'wrap'} color="gray.500">
            {place && <Text>{place}</Text>}
            {date && place && <Text>•</Text>}
            {date && <Text>{date}</Text>}
          </Group>
          <LinkOverlay as={Link} href={href}>
            <Heading
              as="h3"
              textTransform="uppercase"
              fontSize="lg"
              letterSpacing="wide"
              lineClamp={3}
            >
              {title}
            </Heading>
          </LinkOverlay>

          <Text fontSize="md" lineHeight="base" lineClamp={3}>
            {description}
          </Text>
        </Stack>
      </Stack>
    </LinkBox>
  )
}
