import { FC } from 'react'

import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { AiFillHeart } from 'react-icons/ai'
import { FaCalendarDay, FaClock, FaEye } from 'react-icons/fa'

import { useGetBlogSlug, useLikeBlog, useViewBlog } from '@fc/services'
import { Blog, UploadFile } from '@fc/types'
import { getReadingTime } from '@fc/utils'

import { BlogCard } from '../BlogCard'
import { FormattedDate } from '../FormattedDate'
import { Markdown } from '../Markdown'
import { ShareButtons } from '../ShareButtons'
import { WImage } from '../WImage'

export type BlogDetailProps = {
  link: string
  source: MDXRemoteSerializeResult
  authorBlogs: Blog[]
}

const BlogDetail: FC<BlogDetailProps> = ({ link, source, authorBlogs }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  useViewBlog()
  const { data: post } = useGetBlogSlug()

  const { isLiked, toggleLike, isLoading, isDisabled } = useLikeBlog()

  const readingTime = getReadingTime(post?.content || '', locale)

  return (
    <Stack py={8} spacing={8}>
      <WImage ratio="twitter" rounded="lg" src={post?.image as UploadFile} />
      <Heading as="h1" textAlign="center">
        {post?.title}
      </Heading>
      <Wrap
        fontSize="md"
        justify={{ base: 'center', md: 'space-between' }}
        color="gray.500"
        spacing={4}
      >
        <Wrap spacing={4} justify="center">
          <Box>
            <HStack>
              <Icon as={FaCalendarDay} />
              <FormattedDate date={post?.publishedAt as string} />
            </HStack>
            <HStack>
              <Icon as={FaClock} />
              <Text>{readingTime}</Text>
            </HStack>
          </Box>
          <Box>
            <HStack>
              <Box as={FaEye} />
              <Text>{post?.views} views</Text>
            </HStack>
            <HStack>
              <Box as={AiFillHeart} />
              <Text>{post?.likes || 0} likes</Text>
            </HStack>
          </Box>
        </Wrap>

        <ShareButtons
          title={post?.title}
          url={link}
          quote={post?.description as string}
        >
          <IconButton
            rounded="full"
            aria-label="like post"
            color={isLiked ? 'red.500' : 'blue.600'}
            icon={<AiFillHeart />}
            onClick={toggleLike}
            isLoading={isLoading}
            isDisabled={isDisabled}
          />
        </ShareButtons>
      </Wrap>
      <Box textAlign={{ base: 'left', lg: 'justify' }}>
        <Markdown source={source} />
        <Text>
          <>
            {t('author')}: {post?.author?.name || post?.author?.email}
          </>
        </Text>
      </Box>
      <SimpleGrid m={4} gap={8} columns={{ base: 1, md: 2 }}>
        {authorBlogs.map((blog, idx) => (
          <BlogCard key={idx} post={blog} isFeatured={true} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default BlogDetail
