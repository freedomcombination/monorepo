const EDGE_CONFIG_KEY =
  process.env.NODE_ENV === 'production' ? 'last-hashtag' : 'last-hashtag-dev'
const set = async (value: string) => {
  try {
    const requestUrl = `https://api.vercel.com/v1/edge-config/${process.env.EDGE_TOKEN}/items`
    const requestConfig = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            operation: 'update',
            key: EDGE_CONFIG_KEY,
            value,
          },
        ],
      }),
    }
    const response = await fetch(requestUrl, requestConfig)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        JSON.stringify(
          {
            result,
            requestUrl,
            requestConfig,
          },
          null,
          2,
        ),
      )
    }

    console.info(
      "Updated edge config '",
      EDGE_CONFIG_KEY,
      "' to '" + value + "'",
    )

    return result
  } catch (error) {
    console.error(error)
  }
}

export default {
  async afterCreate({ result }) {
    const edgeValue = `${result.slug}__${result.date}`
    await set(edgeValue)
  },

  async afterUpdate({ result }) {
    const edgeValue = `${result.slug}__${result.date}`
    await set(edgeValue)
  },
}
