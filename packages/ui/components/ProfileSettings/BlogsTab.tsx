import { useState } from 'react'

import { Center, SimpleGrid, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useGetAuthorBlogs } from '@fc/services/blog/get'
import type { Blog } from '@fc/types'

import { BlogCard } from '../BlogCard'
import { ModelEditForm } from '../ModelEditForm'

export const BlogsTab = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const { t } = useTranslation()
  const { data: blogs, refetch } = useGetAuthorBlogs()

  const onSelectBlog = (blog: Blog) => {
    setSelectedBlog(blog)
  }

  if (selectedBlog) {
    return (
      <ModelEditForm<Blog>
        endpoint="blogs"
        model={selectedBlog}
        onSuccess={() => {
          refetch()
          setSelectedBlog(null)
        }}
        onClose={() => setSelectedBlog(null)}
      />
    )
  }

  if (!blogs) {
    return (
      <Center>
        <Text>{t('profile.blogs.not-found')}</Text>
      </Center>
    )
  }

  return (
    <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 2 }}>
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          post={blog}
          isFeatured={false}
          onClick={() => onSelectBlog(blog)}
        />
      ))}
    </SimpleGrid>
  )
}
