/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import axios from 'axios'
import { strapiRequest } from '@fc/services/common/strapiRequest'

export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          'https://wsvv-api-staging.onrender.com/api/blogs?locale=tr',
        )
        console.log('response', response)
        setBlogs(response.data.data) // Adjust this based on the API response structure
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <Box>
      {blogs.map(blog => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </Box>
  )
}
