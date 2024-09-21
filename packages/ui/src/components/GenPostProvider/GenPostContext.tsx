import { createContext } from 'react'

import { Hashtag } from '@fc/types'

import { GenPostValueType } from './types'

export const GenPostContext = createContext<GenPostValueType>({
  addPosts: () => [],
  removePosts: () => Promise.resolve(),
  removePost: () => null,
  modifyPost: () => null,
  postCount: () => 0,
  getArchive: () => undefined,
  archives: [],
  hashtag: {} as Hashtag,
  post: undefined,
  askBeforeDelete: true,
  setAskBeforeDelete: () => null,
  getPosts: () => [],
  removeSentence: () => null,
})
