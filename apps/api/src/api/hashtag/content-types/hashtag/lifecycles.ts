const EDGE_CONFIG_KEY =
  process.env.VERCEL_ENV === 'production' ? 'last-hashtag' : 'last-hashtag-dev'

// TODO: Update the edge config based on hashtag's locale
// We need to first fetch the config items, then update the one we need
// And what if the updated/created hashtag is newer than one of the upcoming events?
// We should probably update the edge config only if the hashtag is closer to the current date
// In this case, how do we handle updating for the latest hashtags which have created/updated in the past?
const updateEdgeConfig = async (value: string) => {
  try {
    const requestUrl = process.env.EDGE_ENDPOINT
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

    console.info(`Updated edge config '${EDGE_CONFIG_KEY}' to '${value}'`)

    return result
  } catch (error) {
    console.error(error)
  }
}

export default {
  async afterCreate({ result }) {
    const edgeValue = `${result.id}__${result.date}`
    await updateEdgeConfig(edgeValue)
  },

  async afterUpdate({ result }) {
    const edgeValue = `${result.id}__${result.date}`
    await updateEdgeConfig(edgeValue)
  },
}
