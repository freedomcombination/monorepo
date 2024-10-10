/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'

import { Input, Stack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

const fetchBlogs = async (title?: string) => {
  // TODO: Use strapiRequest
  // TODO: Add title filter
  // Return blogs array instead of StrapiCollectionResponse ({data, meta})
}

const useBlogsQuery = (title?: string) => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () => fetchBlogs(title),
  })
}

export const FetchWithCustomQuery = () => {
  const [title, setTitle] = useState<string>()
  const { data, isLoading, isFetching } = useBlogsQuery(title)

  const isLoaded = !isLoading && !isFetching

  return (
    <Stack>
      <Input placeholder="Blog title" value={title} />
      {/* TODO: Render titles */}
    </Stack>
  )
}
