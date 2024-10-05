import { StrapiCollectionResponse, Tag } from '@fc/types'

export const TAG_MOCKS: StrapiCollectionResponse<Tag[]> = {
  data: [
    {
      id: 2,
      name_en: 'freedom',
      name_nl: 'vrijheid',
      name_tr: 'özgürlük',
      createdAt: '2022-04-01T08:17:12.323Z',
      updatedAt: '2022-09-13T21:38:59.050Z',
      publishedAt: '2022-04-01T08:17:13.727Z',
      slug: 'freedom',
    },
    {
      id: 1,
      name_en: 'humanity',
      name_nl: 'mensheid',
      name_tr: 'insanlik',
      createdAt: '2022-03-13T18:51:30.378Z',
      updatedAt: '2022-09-13T21:39:05.351Z',
      publishedAt: '2022-03-13T18:51:30.941Z',
      slug: 'humanity',
    },
    {
      id: 3,
      name_en: 'way',
      name_nl: 'weg',
      name_tr: 'yol',
      createdAt: '2022-06-22T05:56:35.069Z',
      updatedAt: '2022-09-13T21:39:11.885Z',
      publishedAt: '2022-06-22T05:57:55.926Z',
      slug: 'way',
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 3 } },
}
