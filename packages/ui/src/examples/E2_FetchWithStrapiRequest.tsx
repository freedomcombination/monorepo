/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib'

export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // TODO: fetch blogs with strapiRequest by using the API_URL and PUBLIC_TOKEN
    // Remember that fetcher is a wrapper around axios that adds the token and api url to the request
  }, [])

  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
