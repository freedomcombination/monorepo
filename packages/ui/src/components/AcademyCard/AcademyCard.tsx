import { FC } from 'react'

import { Link } from '@chakra-ui/next-js'
import {
  AspectRatio,
  Card,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'

import { WImage } from '../../components'
import { AcademyCardProps } from './types'

export const AcademyCard: FC<AcademyCardProps> = ({
  href,
  image,
  description,
  title,
}) => {
  const baseTranslate = description ? 'translateY(5rem)' : 'translateY(2rem)'

  return (
    <LinkBox as="article">
      <LinkOverlay as={Link} href={href}>
        <AspectRatio ratio={1}>
          <Card
            rounded="xl"
            position="relative"
            role="group"
            overflow="hidden"
            w="100%"
          >
            <WImage
              src={image}
              _groupHover={{ transform: 'scale(1.05 )' }}
              transition={'all'}
              transitionDuration={'0.2s'}
            />
            <Stack
              transform={baseTranslate}
              p={6}
              color="white"
              position="absolute"
              bottom={0}
              left={0}
              w={'full'}
              _groupHover={{ transform: 'translateY(0)' }}
              transition="all"
              transitionDuration="0.3s"
              bgGradient="linear(to-t, rgba(0,0,0,0.5), rgba(0,0,0,0))"
              spacing={4}
            >
              <Text fontWeight={600} fontSize={'xl'} noOfLines={1}>
                {title}
              </Text>
              {description && (
                <Text
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  noOfLines={2}
                  transitionDuration="0.8s"
                >
                  {description}
                </Text>
              )}
            </Stack>
          </Card>
        </AspectRatio>
      </LinkOverlay>
    </LinkBox>
  )
}
