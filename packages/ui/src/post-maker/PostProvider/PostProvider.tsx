import {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { TWITTER_CHAR_LIMIT, TWITTER_LINK_CHAR_COUNT } from './constants'
import { initialPostContext, initialPostState } from './state'
import { PostContextType, PostProviderProps, PostState } from './types'
import { useHashtagContext } from '../HashtagProvider'

export const PostContext = createContext<PostContextType>(initialPostContext)

export const PostProvider: FC<PostProviderProps> = ({ post, children }) => {
  const [sentence, setSentence] = useState(initialPostState.sentence)

  const {
    postMentions,
    postTrends,
    defaultTrends,
    updatePostSentenceShares,
    hashtagSentences,
  } = useHashtagContext()

  const sentences = hashtagSentences[post.id] ?? []

  const postState = useMemo<Omit<PostState, 'sentence' | 'sentences'>>(() => {
    const mentionUsernames = postMentions[post.id] ?? []
    const mentionsStr = mentionUsernames
      .filter(Boolean)
      ?.map(username => `@${username}`)
      .join('\n')

    const trendNames = postTrends[post.id] ?? []
    const defaultTrendNames = defaultTrends[post.id] ?? []

    const trendsStr = [...defaultTrendNames, ...trendNames]
      .filter(Boolean)
      .join('\n')

    const postContent = [sentence?.value, mentionsStr, trendsStr]
      .filter(Boolean)
      .join('\n\n')

    const count = TWITTER_LINK_CHAR_COUNT + postContent.length

    const percentage = Math.round((count / TWITTER_CHAR_LIMIT) * 100)
    const isExceeded = count > TWITTER_CHAR_LIMIT
    const exceededCharacters =
      count - TWITTER_CHAR_LIMIT > 0 ? count - TWITTER_CHAR_LIMIT : 0

    const threshold =
      (sentence && sentence.value?.length - exceededCharacters) || 0
    const availableCount = TWITTER_CHAR_LIMIT - count

    return {
      availableCount,
      count,
      isExceeded,
      percentage,
      post,
      postContent,
      threshold,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postMentions, postTrends, defaultTrends, sentence?.value, post])

  useEffect(() => {
    if (!sentences.length) return

    const leastSharedSentence = sentences[0]

    const counts = sentences.reduce(
      (acc, sentence) => {
        const currentUnsharedCount = sentence.shareCount > 0 ? 0 : 1
        const previousUnsharedCount = acc.unsharedCount
        const unsharedCount = currentUnsharedCount + previousUnsharedCount

        return {
          ...acc,
          unsharedCount,
          shareCount: (acc.shareCount || 0) + sentence.shareCount,
        }
      },
      {
        unsharedCount: 0,
        shareCount: 0,
      },
    )

    updatePostSentenceShares({
      postId: post.id,
      leastShareCount: leastSharedSentence.shareCount,
      unsharedCount: counts.unsharedCount,
      totalShares: counts.shareCount,
      totalSentences: sentences.length,
    })

    // if (hasSaved.current) return

    setSentence(leastSharedSentence)

    // hasSaved.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentences])

  return (
    <PostContext.Provider
      value={{
        // state
        ...postState,
        post,
        sentence,
        sentences,
        setSentence,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => useContext(PostContext)
