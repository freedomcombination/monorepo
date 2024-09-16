import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'

import { mutation } from '@fc/lib/src/mutation/mutation'
import { strapiRequest } from '@fc/lib/src/request'
import { Art, Post } from '@fc/types'

import { TOKEN } from '../constants'

test.describe('01. Example API call', () => {
  test('TC-01: should fetch arts without token', async ({ request }) => {
    const response = await strapiRequest<Art>(
      {
        endpoint: 'arts',
      },
      request,
    )

    const arts = response.data
    const art = arts?.[0]
    const title = art?.title_en

    expect(title).not.toBeUndefined()
  })

  test('TC-02: should not fetch relational data without populate', async ({
    request,
  }) => {
    const response = await strapiRequest<Post>(
      {
        endpoint: 'posts',
        populate: null,
      },
      request,
    )

    const posts = response.data
    const post = posts?.[0]

    expect(post.hashtag).toBeUndefined()
  })

  test('TC-03: should create tag', async ({ request }) => {
    const response = await mutation(
      {
        endpoint: 'tags',
        method: 'post',
        body: {
          name_en: faker.lorem.word(),
          name_nl: faker.lorem.word(),
          name_tr: faker.lorem.word(),
          slug: faker.lorem.slug(),
        },
        // TODO: Create a boxing function to get token after login
        token: TOKEN,
      },
      request,
    )

    console.log('response', response)
  })
})
