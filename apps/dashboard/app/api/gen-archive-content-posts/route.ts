import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

import { generateMockArchivePost } from '@fc/utils/generateMockArchivePost'
import { getMockReadableStream } from '@fc/utils/getMockReadableStream'

export const runtime = 'edge'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY! ?? '',
})

const capitalizeFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1)

export async function POST(req: Request) {
  const {
    prompt,
    numberOfDescriptions,
    numberOfSentences,
    charLimitOfDescriptions,
    charLimitOfSentences,
    language,
    useFakeApi = true,
  } = await req.json()

  const descriptionCount =
    numberOfDescriptions > 0 || numberOfDescriptions < 10
      ? numberOfDescriptions
      : 'two'
  const sentenceCount =
    numberOfSentences > 0 || numberOfSentences < 10 ? numberOfSentences : 'two'
  const characterLimitOfDescriptions =
    charLimitOfDescriptions > 0 || charLimitOfDescriptions <= 150
      ? charLimitOfDescriptions
      : 150
  const characterLimitOfSentences =
    charLimitOfSentences > 0 || charLimitOfSentences <= 200
      ? charLimitOfSentences
      : 150

  // If dev environment, return mock stream response
  if (process.env.NODE_ENV !== 'production' && useFakeApi) {
    const mockResponse = JSON.stringify(
      generateMockArchivePost(
        descriptionCount,
        sentenceCount,
        characterLimitOfDescriptions,
        characterLimitOfSentences,
      ),
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

  // https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-text
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system:
      'You are an activist, and your task is to raise awareness about human rights violations.',
    prompt: `Given the following context, generate ${descriptionCount} descriptions and ${sentenceCount} sentences in ${capitalizeFirstLetter(language)} for each description. The description will be a gist of the context, and should not exceed ${characterLimitOfDescriptions} characters and the sentences shouldn't exceed ${characterLimitOfSentences} characters.
Respond with a JSON array of objects containing description and sentences keys [{description: "description1", sentences: ["sentence1", "sentence2", ...]}, {description: "description2", sentences: ["sentence1", "sentence2", ...]}]. Only respond with an array. Context:
${prompt}`,
    temperature: 0, // absolute certainty
  })

  // use this with streamText()
  // return result.toTextStreamResponse()

  return new Response(text)
}

// const sampleResponse = {
//   description: 'abc',
//   sentences: ['s1', 's2'],
// }
