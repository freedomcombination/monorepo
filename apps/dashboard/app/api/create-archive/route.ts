import { AssistantResponse } from 'ai'
import fs from 'fs'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const input: {
    threadId: string | null
    message: string
  } = await req.json()

  let assistantId
  assistantId = process.env.ASSISTANT_ID!

  // console.log('###### assistant id: ', assistantId)

  if (!assistantId) {
    const file = await openai.files.create({
      file: fs.createReadStream('data.txt'),
      purpose: 'assistants',
    })

    const vectorStore = await openai.beta.vectorStores.create({
      name: 'Category and Tag Pool',
      file_ids: [file.id],
    })

    const assistant = await openai.beta.assistants.create({
      name: 'News Analyst Assistant',
      instructions: `Your job is to read and analyze news articles and then depending on their content, you should return a matching category or categories and a tag or tags ONLY from the list provided in the file. Make sure to return a JSON in the following format {"categories": ["Category1","Category2",...], "tags": ["Tag1", "Tag2", ...]}. If the user's message is not an article or you can't find a matching category or tag return an empty string`,
      model: 'gpt-4o-mini',
      tools: [{ type: 'file_search' }],
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id],
        },
      },
      temperature: 0,
    })

    assistantId = assistant.id
    console.log('###### assistant id: ', assistantId)
  }

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id

  // console.log('•••••••••••••••• thread ID: ', threadId)

  // Add a message to the thread
  const message = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  })

  return AssistantResponse(
    { threadId, messageId: message.id },
    async ({ forwardStream }) => {
      // Run the assistant on the thread
      const run = openai.beta.threads.runs.stream(threadId, {
        // assistant_id: assistant.id,
        assistant_id: assistantId,
      })
      await forwardStream(run)
    },
  )
}
