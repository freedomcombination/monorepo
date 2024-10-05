import { Mention, MentionUserData, StrapiCollectionResponse } from '@fc/types'

export const MENTION_MOCKS: StrapiCollectionResponse<Mention[]> = {
  data: [
    {
      id: 1,
      username: 'samenvvvEN',
      data: {} as MentionUserData,
      createdAt: '2022-03-22T15:20:22.002Z',
      updatedAt: '2022-03-22T15:20:33.750Z',
      publishedAt: '2022-03-22T15:20:25.243Z',
      locale: 'nl',
    },
    {
      id: 5,
      username: 'hrw',
      data: {} as MentionUserData,
      createdAt: '2022-03-22T15:20:22.002Z',
      updatedAt: '2022-03-22T15:20:33.750Z',
      publishedAt: '2022-03-22T15:20:25.243Z',
      locale: 'nl',
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
