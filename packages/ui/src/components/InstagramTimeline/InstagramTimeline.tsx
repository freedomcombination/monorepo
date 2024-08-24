import { FC, useEffect, useState } from 'react'

import {
  Box,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Button,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { InstagramPost } from './types'

const InstagramTimeline: FC = () => {
  const { t } = useTranslation()
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch('/api/instagram')
        if (!response.ok) throw new Error('Network response was not ok')

        const data = await response.json()
        const filteredPosts = data.data.filter(
          (post: InstagramPost) => post.media_type === 'IMAGE',
        )
        setPosts(filteredPosts)
      } catch (error: any) {
        setError(error.message)
        console.error('Error fetching Instagram posts:', error)
      }
    }

    fetchInstagramPosts()
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <Box py={10}>
      <Stack spacing={4} align="center">
        <Heading as="h2" size="lg" mb={4}>
          {t('instagramPageTitle')}
        </Heading>
      </Stack>

      <SimpleGrid columns={[2, null, 4]} spacing={6} mt={8}>
        {posts.map(post => (
          <Link
            href={post.permalink}
            key={post.id}
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            {post.media_type === 'IMAGE' && (
              <Image
                src={post.media_url}
                alt={post.caption}
                borderRadius="md"
              />
            )}
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
          colorScheme="teal"
        >
          {t('visitOurInstagram')}
        </Button>
      </Stack>
    </Box>
  )
}

export default InstagramTimeline
