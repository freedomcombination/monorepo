// Don't export this function from index.ts because it's used only in edge environment

import { loremIpsum } from 'lorem-ipsum'

export const generateMockTweets = (
  numberOfPosts: number,
  charLimit: number,
) => {
  const result: string[] = []
  const wordCount = Math.floor(charLimit / 5)

  for (let i = 0; i < numberOfPosts; i++) {
    const tweet = loremIpsum({
      count: 1,
      units: 'sentences',
      sentenceUpperBound: wordCount + 2,
    })?.slice(0, charLimit)

    result.push(tweet)
  }

  return result
}
