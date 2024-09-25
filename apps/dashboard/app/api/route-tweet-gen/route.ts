import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

import { generateMockTweets } from '@fc/utils/generateMockTweets'
import { getMockReadableStream } from '@fc/utils/getMockReadableStream'

export const runtime = 'edge'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY! ?? '',
})

export async function POST(req: Request) {
  const { prompt, numberOfPosts, charLimit, language, useApiInDev } =
    await req.json()
  const postCount =
    numberOfPosts > 0 || numberOfPosts < 40 ? numberOfPosts : 'two'
  const characterLimit = charLimit > 0 || charLimit <= 150 ? charLimit : 200

  // If dev environment, return mock stream response
  if (process.env.NODE_ENV === 'development' && !useApiInDev) {
    const mockResponse = JSON.stringify(
      generateMockTweets(postCount, characterLimit),
    )

    // Create a ReadableStream from your mock response
    const stream = getMockReadableStream(mockResponse)

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  }

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system:
      'You are an activist, and your task is to raise awareness about human rights violations.',
    prompt: `Given the following article, generate ${postCount} ${language} posts for Twitter. The post shouldn't include any hashtags, and shouldn't exceed ${characterLimit} characters.
Respond with a JSON array of posts ["post1", "post2" , ...]. Only respond with an array. Article:
${prompt}`,
    temperature: 0, // absolute certainty
  })

  return result.toTextStreamResponse()
}
