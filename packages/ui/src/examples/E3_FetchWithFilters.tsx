/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Input, List, ListItem } from '@chakra-ui/react'

import { strapiRequest } from '@fc/lib'
import { Blog } from '@fc/types'

export type RequestFilterProps = {
  initialValue: string
}

export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [title, setTitle] = useState(initialValue)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await strapiRequest<Blog>({
          endpoint: 'blogs',
          locale: 'tr',
          filters: {
            title: { $containsi: title },
          },
          sort: ['updatedAt:desc'],
          populate: '*',
        });

        if (response?.data?.length != 0) {
          setBlogs(response.data)
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [title])

  const handleChange = (e: any) => setTitle(e.target.value)

  return <Box>
    <Input
      value={title}
      onChange={handleChange}
      placeholder="Title filter"
      my={2}
    />

    <List>
      {blogs.map(({ id, title }) => (
        <ListItem key={id}>{title}</ListItem>
      ))}
    </List>
  </Box>
}
