export const getMockReadableStream = (input: string) => {
  const stream = new ReadableStream({
    async start(controller) {
      // Split the response into chunks by 50 characters
      const chunks = input.match(/.{1,50}/g) || []

      // Enqueue each chunk with a delay
      for (const chunk of chunks) {
        await new Promise(resolve => setTimeout(resolve, 100)) // 0.1 second delay
        // Gets the data and sends it to the browser via the controller
        controller.enqueue(new TextEncoder().encode(chunk))
      }

      controller.close()
    },
  })

  return stream
}
