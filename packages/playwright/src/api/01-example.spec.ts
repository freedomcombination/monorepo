import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'

import type { Art, Post, Category, CategoryCreateInput } from '@fc/types'

import { API_TOKEN } from '../constants'
import { test } from '../fixtures'

test.describe('01. Example API call', { tag: ['@api'] }, () => {
  test('TC-01: should fetch arts without token', async ({ api }) => {
    const response = await api.get<Art>({ endpoint: 'arts' })

    const arts = response.data
    const art = arts?.[0]
    const title = art?.title_en

    expect(title).not.toBeUndefined()
  })

  test('TC-02: should not fetch relational data without populate', async ({
    api,
  }) => {
    const response = await api.get<Post>({
      endpoint: 'posts',
      populate: null,
    })

    const posts = response.data
    const post = posts?.[0]

    expect(post.hashtag?.id).toBeUndefined()
  })

  test('TC-03: should create category', async ({ api }) => {
    const name = faker.lorem.word()
    const slug = faker.lorem.slug()

    const categoryBody: CategoryCreateInput = {
      name_en: name,
      name_nl: name,
      name_tr: name,
      slug,
    }

    const response = await api.post<Category, CategoryCreateInput>(
      'categories',
      categoryBody,
      // TODO: Create a boxing function to get token after login
      API_TOKEN,
    )

    const id = response?.data?.id ?? 0

    expect(response?.data?.slug).toBe(slug)

    const deleteResponse = await api.delete<Category>(
      'categories',
      id,
      API_TOKEN,
    )

    expect(deleteResponse.data?.id).toBe(id)
  })

  test('TC-04: should not create category with invalid body', async ({
    api,
  }) => {
    const name = faker.lorem.word()
    const invalidSlug = faker.lorem.sentence()
    const response = await api.post<Category, CategoryCreateInput>(
      'categories',
      {
        slug: invalidSlug,
        name_en: name,
        name_nl: name,
        name_tr: name,
      },
      API_TOKEN,
    )

    expect(response.status).toBe(400)
  })
})
