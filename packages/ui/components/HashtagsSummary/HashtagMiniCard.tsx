import { FC } from 'react'

import { Link } from '@chakra-ui/next-js'
import { Card, Heading, Stack, Text } from '@chakra-ui/react'

import type { Hashtag } from '@fc/types'
import { WImage } from '@fc/ui/components/WImage'

type HashtagMiniCardProps = {
  hashtag: Hashtag
  link: string
}

export const HashtagMiniCard: FC<HashtagMiniCardProps> = ({
  hashtag,
  link,
}) => {
  return (
    <Card
      as={Link}
      href={link || '/'}
      direction={'row'}
      variant="solid"
      borderRadius={'xl'}
      transition={'all'}
      transitionDuration={'300ms'}
      alignItems={{ base: 'center', md: 'stretch' }}
      _hover={{
        lg: {
          bgGradient: 'linear(to-r, blackAlpha.50, white)',
          transform: 'translateX(4px)',
        },
      }}
    >
      <WImage ratio={1 / 1} w={'3xs'} borderRadius={'xl'} src={hashtag.image} />
      <Stack p={{ base: 2, sm: 5 }} justifyContent={'flex-start'}>
        <Heading as={'h4'} fontSize={{ base: 'md', md: 'xl' }}>
          {hashtag.title}
        </Heading>
        <Text>{hashtag.description?.substring(0, 45).concat('...')}</Text>
      </Stack>
    </Card>
  )
}
