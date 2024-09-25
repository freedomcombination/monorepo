/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { strapiRequest } from '@fc/services/common/request'

type RequestFilterProps = {
  initialValue: string
}

export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState(initialValue)

  useEffect(() => {
    // REF: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
    // TODO: Fetch blogs with by providing `title` filter to strapiRequest (title: { $containsi: title })
    // NOTE: Changing `title` should trigger a new fetch.
    // BONUS: You can play by using other arguments of strapiRequest (sort, populate,  fields etc).
  }, [])

  // TODO Add Input to change titleFilter
  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
