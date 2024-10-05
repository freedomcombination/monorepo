/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { strapiRequest } from '@fc/services/common/strapiRequest'

type RequestFilterProps = {
  initialValue: string
}
export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState<any[]>([]) // State for blogs
  const [title, setTitle] = useState(initialValue)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await strapiRequest({
          endpoint: 'blogs',
          locale: 'tr',
          filters: {
            title: {
              $containsi: title, // Filter condition for title
            },
          },
          sort: ['createdAt:desc'], // Sort by creation date descending
        })
        setBlogs(response.data || []) // Set the blogs from response
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    if (title) fetchBlogs()
  }, [title]) // Fetch when title changes

  // Function to handle input changes
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <Box>
      <input
        type="text"
        placeholder="Filter by Title"
        value={title}
        onChange={handleTitleChange}
      />
      {blogs.map(blog => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </Box>
  )
}
