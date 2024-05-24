import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { generateMockTweets } from '@fc/utils/src/generateMockTweets'
import { getMockReadableStream } from '@fc/utils/src/getMockReadableStream'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
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

    // Use the stream as input to your StreamingTextResponse
    return new StreamingTextResponse(stream)
  }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    // model: 'gpt-4',
    // model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are an activist, and your task is to raise awareness about human rights violations.`,
      },
      {
        role: 'user',
        content: `Given the following article, generate ${postCount} ${language} posts for Twitter. The post shouldn't include any hashtags, and shouldn't exceed ${characterLimit} characters.
Respond with a JSON array of posts ["post1", "post2" , ...]. Only respond with an array. Article:
${prompt}`,
      },
    ],
    temperature: 0, // absolute certainty
    // max_tokens: 200,
    // top_p: 1,
    // frequency_penalty: 1,
    // presence_penalty: 1,
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
