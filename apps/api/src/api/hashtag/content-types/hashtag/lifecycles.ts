const set = async (key: string, value: string) => {
  try {
    const requestUrl = `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG}/items`
    const requestConfig = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            operation: 'update',
            key,
            value,
          },
        ],
      }),
    }
    const response = await fetch(requestUrl, requestConfig)
    const result = await response.json()

    if (!response.ok) throw new Error(result.message)

    return result
  } catch (error) {
    console.log(error)
  }
}

export default {
  async afterCreate({ result }) {
    const slug = result.slug
    const isoTime = result.date
    const edgeValue = `${slug}__${isoTime}`
    await set('last-hashtag', edgeValue)
  },

  async afterUpdate({ result }) {
    const slug = result.slug
    const isoTime = result.date
    const edgeValue = `${slug}__${isoTime}`
    await set('last-hashtag', edgeValue)
  },
}
