import { FC } from 'react'

import {
  Button,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import type { InstagramPost } from '@fc/types'

type InstagramTimelineProps = {
  posts: InstagramPost[]
}

export const InstagramTimeline: FC<InstagramTimelineProps> = ({ posts }) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={8}>
      <Heading as="h2" size="lg" textAlign={'center'}>
        {t('instagram-page-title')}
      </Heading>

      <SimpleGrid columns={{ sm: 2, md: 3 }} gap={1}>
        {posts.map(post => (
          <Link
            href={post.permalink}
            key={post.id}
            isExternal
            _hover={{ textDecoration: 'none' }}
            overflow={'hidden'}
          >
            <Image
              src={post.thumbnail_url || post.media_url}
              alt={post.caption}
              aspectRatio={1}
              objectFit="cover"
              transition={'transform 0.3s ease-in-out'}
              pos={'relative'}
              _hover={{ opacity: 0.8 }}
            />
          </Link>
        ))}
      </SimpleGrid>

      <Stack spacing={4} align="center" mt={8}>
        <Button
          as="a"
          href="https://www.instagram.com/trendrights"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
        >
          {t('instagram-visit-button')}
        </Button>
      </Stack>
    </Stack>
  )
}
