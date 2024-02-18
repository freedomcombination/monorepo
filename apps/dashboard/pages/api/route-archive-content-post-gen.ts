import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const capitalizeFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1)

export default async function handler(req: Request) {
  const {
    prompt,
    numberOfDescriptions,
    numberOfSentences,
    charLimitOfDescriptions,
    charLimitOfSentences,
    language,
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

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    // model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'You are an activist, and your task is to raise awareness about human rights violations.',
      },
      {
        role: 'user',
        content: `Given the following context, generate ${descriptionCount} descriptions and ${sentenceCount} sentences in ${capitalizeFirstLetter(language)} for each description. The description will be a gist of the context, and should not exceed ${characterLimitOfDescriptions} characters and the sentences shouldn't exceed ${characterLimitOfSentences} characters.
Respond with a JSON array of objects containing description and sentences keys [{description: "description1", sentences: ["sentence1", "sentence2", ...]}, {description: "description2", sentences: ["sentence1", "sentence2", ...]}]. Only respond with an array. Context:
${prompt}`,
      },
    ],
    temperature: 0, // absolute certainty
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}

// const sampleResponse = {
//   description: 'abc',
//   sentences: ['s1', 's2'],
// }
