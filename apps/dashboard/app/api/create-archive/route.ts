import { AssistantResponse } from 'ai'
import fs from 'fs'
import OpenAI from 'openai'
import path from 'path'

import { strapiRequest } from '@fc/services/common/strapiRequest/strapiRequest'
import { Prison, type Category, type Victim } from '@fc/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false

  return a.sort().join(',') === b.sort().join(',')
}

export async function POST(req: Request) {
  const input: {
    threadId: string | null
    message: string
  } = await req.json()

  let assistantId = process.env.ASSISTANT_ID!

  // Read file content
  const filePath = path.join(process.cwd(), 'data.txt')
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const parsedFileContent = JSON.parse(fileContent)

  // Query Strapi for comparison
  const categories = await strapiRequest<Category>({
    endpoint: 'categories',
    fields: ['name_tr'],
    filters: {
      platforms: {
        name_tr: { $eqi: 'Trend Rights' },
      },
    },
  })

  const victims = await strapiRequest<Victim>({
    endpoint: 'victims',
    fields: ['name'],
  })

  const prisons = await strapiRequest<Prison>({
    endpoint: 'prisons',
    fields: ['name'],
  })

  // Comparison btw the file and Strapi
  const categoriesEqual = arraysEqual(
    parsedFileContent.categories ?? [],
    categories.data.map(c => c.name_tr) ?? [],
  )

  const prisonsEqual = arraysEqual(
    parsedFileContent.prisons ?? [],
    prisons.data.map(p => p.name) ?? [],
  )

  const victimsEqual = arraysEqual(
    parsedFileContent.victims ?? [],
    victims.data.map(v => v.name) ?? [],
  )

  const fileUpdated = !(categoriesEqual && prisonsEqual && victimsEqual)

  // Update both the file and Assistant if there's a difference
  if (fileUpdated) {
    const jsonData = {
      categories: categories?.data?.map(c => c.name_tr) ?? [],
      victims: victims?.data?.map(v => v.name) ?? [],
      prisons: prisons?.data?.map(p => p.name) ?? [],
    }

    fs.writeFileSync('data.txt', JSON.stringify(jsonData))

    // Update the Assistant if there's one
    if (assistantId) {
      const file = await openai.files.create({
        // ? is better to use filePath instead of a hardcoded path
        file: fs.createReadStream('data.txt'),
        purpose: 'assistants',
      })

      const vectorStore = await openai.beta.vectorStores.create({
        name: 'Category and Tag Pool',
        file_ids: [file.id],
      })

      console.info('•••• Updating Assistant...')
      // https://platform.openai.com/docs/assistants/tools/file-search/step-3-update-the-assistant-to-use-the-new-vector-store
      await openai.beta.assistants.update(assistantId, {
        tool_resources: {
          file_search: { vector_store_ids: [vectorStore.id] },
        },
      })
      console.info('•••• Updated Assistant!')
    }
  }

  // Create Assistant if there's none
  if (!assistantId) {
    console.info('Creating an assistant...')
    // TODO: Use a custom endpoint to fetch all categories, prisons and victims
    // Strapi has a limit of 100 items max per request
    const file = await openai.files.create({
      // TODO: Does it accept remote URLs?
      file: fs.createReadStream('data.txt'),
      purpose: 'assistants',
    })

    const vectorStore = await openai.beta.vectorStores.create({
      name: 'Category and Tag Pool',
      file_ids: [file.id],
    })

    const assistant = await openai.beta.assistants.create({
      name: 'News Analyst Assistant',
      instructions: `
        Your task is to read and analyze news articles. Based on their content, return the appropriate categories, prisons, and victims, selecting ONLY from the lists provided in the file. 
        Your response must be strictly in JSON format:
        {
          "categories": ["Category1", "Category2", ...],
          "prisons": ["Prison1", "Prison2", ...],
          "victims": ["Victim1", "Victim2", ...]
        }.
        If no exact match is found, return an empty array for that field. Each message from the user must be analyzed independently.
      `
        .replace(/\n/g, '')
        .replace(/\s+/g, ' '),
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
    console.info(`New assistant created, with an ID of: `, assistantId)
  }

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id

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
