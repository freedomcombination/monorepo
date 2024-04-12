import axios from 'axios'

import { PUBLIC_TOKEN } from '@fc/config'
import { Mutation } from '@fc/lib'
import { Category, CategoryCreateInput } from '@fc/types'
import { sleep } from '@fc/utils'

// TODO: Add this to `packages/ui/.env` as NEXT_PUBLIC_API_URL
// and use API_URL instead of STAGING_API_URL
const STAGING_API_URL = 'https://fc-api-staging.onrender.com'
const CATEGORY_URL = `${STAGING_API_URL}/api/categories`

// Create with axios
export const createCategoryWithAxios = async (data: CategoryCreateInput) => {
  return await axios.post(
    CATEGORY_URL,
    { data },
    { headers: { Authorization: `Bearer ${PUBLIC_TOKEN}` } },
  )
}

// Create with our custom mutation function
export const createCategoryWithMutation = async (data: CategoryCreateInput) => {
  await sleep(2000)

  return await Mutation.post<Category, CategoryCreateInput>(
    'categories',
    data,
    PUBLIC_TOKEN as string,
  )
}
