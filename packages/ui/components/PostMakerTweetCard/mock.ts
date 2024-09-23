import { PostState } from '../PostProvider'

export const postMock = {
  post: {
    id: 1,
    description: 'Post description',
    content: 'Post content',
    imageParams: {
      bg: 'red',
      color: 'white',
      text: 'Post image text',
      title: 'Post image title',
      image: 'https://picsum.photos/seed/picsum/200/300',
    },
    locale: 'tr',
    createdAt: '2021-08-01T00:00:00.000Z',
    updatedAt: '2021-08-01T00:00:00.000Z',
    publishedAt: '2021-08-01T00:00:00.000Z',
    approvalStatus: 'approved',
    capsStatus: 'approved',
  },
  availableCount: 10,
  count: 7,
  isExceeded: false,
  postContent: 'Post postContent',
  sentence: {
    postId: 1,
    value: 'Post postText',
    index: 0,
    isPublished: true,
    shareCount: 0,
  },
  sentences: [
    {
      index: 1,
      isPublished: true,
      postId: 1,
      shareCount: 0,
      value: 'Post postText',
    },
  ],
  threshold: 0,
  percentage: 0,
} as unknown as PostState // Missing post title
