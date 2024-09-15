import { FC } from 'react'

import { Heading, Image, Link, SimpleGrid, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { InstagramPost } from '@fc/types'

import { ButtonLink } from '../ButtonLink'

type InstagramTimelineProps = {
  posts: InstagramPost[]
}

export const InstagramTimeline: FC<InstagramTimelineProps> = ({ posts }) => {
  const { t } = useTranslation()

  return (
    <Stack gap={8}>
      <Heading as="h2" size="lg" textAlign={'center'}>
        {t('instagram-page-title')}
      </Heading>

      <SimpleGrid columns={{ sm: 2, md: 3 }} gap={1}>
        {posts.map(post => (
          <Link
            href={post.permalink}
            key={post.id}
            target="_blank"
            rel="noopener noreferrer"
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

      <Stack gap={4} align="center" mt={8}>
        <ButtonLink
          href="https://www.instagram.com/trendrights"
          isExternal
          size="lg"
        >
          {t('instagram-visit-button')}
        </ButtonLink>
      </Stack>
    </Stack>
  )
}
