/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import { strapiRequest } from '@fc/lib'
import { Blog } from '@fc/types';

export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await strapiRequest<Blog>({
          endpoint: 'blogs',
          locale: 'tr',
        });

        if (response?.data?.length != 0) {
          setBlogs(response.data)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <Box>  <ul>
    {blogs.map((blog) => (
      <li key={blog.id}>{blog.title}</li>
    ))}
  </ul></Box>
}
