import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'

import { Art, Post, Tag, TagCreateInput } from '@fc/types'

import { API_TOKEN } from '../constants'
import { apiDeleteRequest, apiGetRequest, apiPostRequest } from '../lib'

test.describe('01. Example API call', () => {
  test('TC-01: should fetch arts without token', async () => {
    const response = await apiGetRequest<Art>({ endpoint: 'arts' })

    const arts = response.data
    const art = arts?.[0]
    const title = art?.title_en

    expect(title).not.toBeUndefined()
  })

  test('TC-02: should not fetch relational data without populate', async () => {
    const response = await apiGetRequest<Post>({
      endpoint: 'posts',
      populate: null,
      token: API_TOKEN,
    })

    const posts = response.data
    const post = posts?.[0]

    expect(post.hashtag?.id).toBeUndefined()
  })

  test('TC-03: should create tag', async () => {
    const name = faker.lorem.word()
    const slug = faker.lorem.slug()

    const tagBody: TagCreateInput = {
      name_en: name,
      name_nl: name,
      name_tr: name,
      slug,
    }

    const response = await apiPostRequest<Tag, TagCreateInput>(
      'tags',
      tagBody,
      // TODO: Create a boxing function to get token after login
      API_TOKEN,
    )

    const id = response?.data?.id

    expect(response?.data?.slug).toBe(slug)

    const deleteResponse = await apiDeleteRequest<Tag>('tags', id, API_TOKEN)

    expect(deleteResponse.data?.id).toBe(id)
  })
})
