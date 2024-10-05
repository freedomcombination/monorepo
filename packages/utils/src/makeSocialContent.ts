import { truncate } from 'lodash'

export const makeSocialContent = (content: string, title?: string) => {
  // TODO: Refactor it by using tweet-text library
  const twitterCharLimit = 280
  const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link
  const titleCharCount = title?.length || 0
  const twitterText = truncate(content, {
    length: twitterCharLimit - linkCharCount - titleCharCount,
  })
  const twitterContent = title ? title + '\n\n' + twitterText : twitterText

  return { twitterContent, content }
}
