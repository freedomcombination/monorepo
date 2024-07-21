import { NextRequest } from 'next/server'

export const imageStreamEdgeHandler = async (req: NextRequest) => {
  const params = new URLSearchParams(req.nextUrl.search)
  const url = params.get('url') || ''

  const response = await fetch(url)

  const reader = response.body?.getReader()

  const readableStream = new ReadableStream({
    async start(controller) {
      if (!reader) return controller.close()

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()

        // When no more data needs to be consumed, break the reading
        if (done) {
          break
        }

        // Enqueue the next data chunk into our target stream
        controller.enqueue(value)
      }

      // Close the stream
      controller.close()
      reader.releaseLock()
    },
  })

  return new Response(readableStream)
}
