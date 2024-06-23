/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { PUBLIC_TOKEN } from '@fc/config' // API_URL
import axios from 'axios'
import { Blog } from '@fc/types'

let API_URL = 'https://wsvv-api-staging.onrender.com';

// https://wsvv-api-staging.onrender.com/api/blogs?locale=tr
// You can use local API_URL instead of the above url
// yarn --cwd apps/api dev to run the api locally (http://localhost:1337)
const BLOG_URL = `${API_URL}/api/blogs`

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { locale } = useRouter()

  const headers = {
    Authorization: 'Bearer ' + PUBLIC_TOKEN,
  }

  const params = new URLSearchParams();
  params.set('locale', 'tr');
  const query = params.toString();

  useEffect(() => {

    axios
      .get(`${BLOG_URL}?${query}`, {})
      .then(response => {
        setBlogs(response.data.data)
      })
      .catch(error => console.log(error))

  }, [])



  return <Box>
    {blogs.map(blog => (
      <h1 key={blog.id}>{blog.title}</h1>
    ))}
  </Box>
}
