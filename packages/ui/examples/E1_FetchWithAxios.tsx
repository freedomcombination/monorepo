import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const BLOG_URL = 'https://wsvv-api-staging.onrender.com/api/blogs?locale=tr'

interface Blog {
  id: string
  title?: string
}

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { locale } = useRouter()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(BLOG_URL, {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
          },
          params: {
            locale: locale || 'tr',
          },
        })

        if (response.status === 200 && response.data.data) {
          setBlogs(response.data.data)

          console.log('All Blogs:', response.data.data)
        } else {
          console.warn('No blogs found for this locale.')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError
          console.error(
            'Axios error:',
            axiosError.response?.data || axiosError.message,
          )
        } else {
          console.error('Unexpected error:', (error as Error).message)
        }
      }
    }

    fetchBlogs()
  }, [locale])

  return (
    <Box>
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <Text key={blog.id}>
            {blog.title || `Blog ID: ${blog.id} - Title not available`}
          </Text>
        ))
      ) : (
        <Text>No blogs available for this locale.</Text>
      )}
    </Box>
  )
}
