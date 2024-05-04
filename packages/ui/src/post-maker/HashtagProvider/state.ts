import { UseDisclosureReturn } from '@chakra-ui/react'

import { HashtagActions, HashtagContextType, HashtagState } from './types'

export const initialHashtagState: HashtagState = {
  activePostId: null,
  defaultTrends: {},
  mentionSearchKey: '',
  mentionsDisclosure: {} as UseDisclosureReturn,
  postMentions: {},
  postSentenceShares: {},
  postTrends: {},
  savedMentions: [],
  trendsDisclosure: {} as UseDisclosureReturn,
  hashtagSentences: {},
  hashtagStats: {
    en: { totalSentences: 0, totalShares: 0, unsharedCount: 0 },
    nl: { totalSentences: 0, totalShares: 0, unsharedCount: 0 },
    tr: { totalSentences: 0, totalShares: 0, unsharedCount: 0 },
  },
  archiveDisclosure: {} as UseDisclosureReturn,
  sentence: null,
}

export const initialHashtagActions: HashtagActions = {
  addMentionToPost: () => null,
  addTrendToPost: () => null,
  removeDefaultTrendFromPost: () => null,
  removeMentionFromPost: () => null,
  removeStoredMention: () => null,
  removeTrendFromPost: () => null,
  setActivePostId: () => null,
  setMentionSearchKey: () => null,
  updatePostSentenceShares: () => null,
  updateStoredMentions: () => null,
  setSentence: () => null,
}

export const initialHashtagContext: HashtagContextType = {
  ...initialHashtagState,
  ...initialHashtagActions,
}
