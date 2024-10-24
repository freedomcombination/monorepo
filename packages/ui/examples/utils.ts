import axios from 'axios'

import { mutation } from '@fc/services/common/mutation'
import type { Category, CategoryCreateInput } from '@fc/types'
import { sleep } from '@fc/utils/sleep'

// TODO: Add this to `packages/ui/.env` as NEXT_PUBLIC_API_URL
// and use API_URL instead of STAGING_API_URL
const STAGING_API_URL = 'https://wsvv-api-staging.onrender.com'
const CATEGORY_URL = `${STAGING_API_URL}/api/categories`

// Create with axios
export const createCategoryWithAxios = async (data: CategoryCreateInput) => {
  return await axios.post(CATEGORY_URL, { data })
}

// Create with our custom mutation function
export const createCategoryWithMutation = async (data: CategoryCreateInput) => {
  await sleep(2000)

  await mutation<Category, CategoryCreateInput>({
    endpoint: 'categories',
    method: 'post',
    body: data,
    token: '',
  })
}
