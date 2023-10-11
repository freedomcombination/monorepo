/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC } from 'react'

import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Blog, StrapiCollectionResponse } from '@wsvvrijheid/types'
import { sleep } from '@wsvvrijheid/utils'
// import { useStrapiRequest } from '@wsvvrijheid/services'
import { strapiRequest } from '@wsvvrijheid/lib'

// TODO: Add this to `packages/ui/.env` as NEXT_PUBLIC_API_URL
const STAGING_API_URL = 'https://wsvv-api-staging.onrender.com'
const BLOG_URL = `${STAGING_API_URL}/api/blogs`

type ExampleBlogCardProps = {
  blog: Blog
}

// Blog card component
const ExampleBlogCard: FC<ExampleBlogCardProps> = ({ blog }) => (
  <Box p={2} boxShadow={'lg'} key={blog.id}>
    <Image
      h={100}
      w={'full'}
      objectFit={'cover'}
      src={`${ASSETS_URL}${blog.image?.url}`}
      alt={blog.title}
    />
    <Text>{blog.title}</Text>
  </Box>
)

export const FetchWithUseQuery = () => {
  const fetchBlogs = async () => {
    // Show loading state
    await sleep(2000)

    // TODO: Replace with strapiRequest
    // return axios<StrapiCollectionResponse<Blog[]>>(BLOG_URL, {
    //   params: { locale: 'tr', populate: 'image' },
    //   headers: {
    //     Authorization: `Bearer ${TOKEN}`,
    //   },
    // })

    return strapiRequest<Blog>({
      endpoint: 'blogs',
      locale: 'tr',
      populate: 'image',
    })
  }

  // const blogsQuery = useQuery(['blogs'], fetchBlogs)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  })

  const isLoaded = !isLoading && !isFetching

  return (
    <Stack>
      {isLoaded ? (
        <SimpleGrid gap={4} columns={{ base: 2, lg: 3 }}>
          {data?.data?.map(blog => (
            <ExampleBlogCard key={blog.id} blog={blog} />
          ))}
        </SimpleGrid>
      ) : (
        <HStack>
          <Spinner /> <Text>Loading blogs...</Text>
        </HStack>
      )}
    </Stack>
  )
}
