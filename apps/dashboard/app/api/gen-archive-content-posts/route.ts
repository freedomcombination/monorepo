import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
// !temp
// import { z } from 'zod'

import { generateMockArchivePost } from '@fc/utils/src/generateMockArchivePost'
import { getMockReadableStream } from '@fc/utils/src/getMockReadableStream'

export const runtime = 'edge'
// !works? +2 lines
export const dynamic = 'force-dynamic'
export const maxDuration = 30

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

  // ! temp: testing streaming obj
  // https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data
  // const responseSchema = z.object({
  //   description: z.string(),
  //   sentences: z.array(z.string()),
  // })

  // const result = await streamObject({
  //   model: openai('gpt-4o-mini', { structuredOutputs: true }),
  //   output: 'array',
  //   schema: responseSchema,
  //   system:
  //     'You are an activist, and your task is to raise awareness about human rights violations.',
  //   prompt: `Given the following context, generate ${descriptionCount} descriptions and ${sentenceCount} sentences in ${capitalizeFirstLetter(language)} for each description. The description will be a gist of the context, and should not exceed ${characterLimitOfDescriptions} characters and the sentences shouldn't exceed ${characterLimitOfSentences} characters. Context:
  // ${prompt}`,
  //   temperature: 0, // absolute certainty
  // })

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system:
      'You are an activist, and your task is to raise awareness about human rights violations.',
    prompt: `Given the following context, generate ${descriptionCount} descriptions and ${sentenceCount} sentences in ${capitalizeFirstLetter(language)} for each description. The description will be a gist of the context, and should not exceed ${characterLimitOfDescriptions} characters and the sentences shouldn't exceed ${characterLimitOfSentences} characters.
Respond with a JSON array of objects containing description and sentences keys [{description: "description1", sentences: ["sentence1", "sentence2", ...]}, {description: "description2", sentences: ["sentence1", "sentence2", ...]}]. Only respond with an array. Context:
${prompt}`,
    temperature: 0, // absolute certainty
  })

  return result.toTextStreamResponse()
}

// const sampleResponse = {
//   description: 'abc',
//   sentences: ['s1', 's2'],
// }
