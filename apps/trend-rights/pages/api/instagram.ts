import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    res.status(500).json({ error: 'Missing Instagram access token' })
  }

  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`,
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Instagram API Error:', errorText)

    return res
      .status(500)
      .json({ error: 'Failed to fetch Instagram posts', details: errorText })
  }

  const data = await response.json()
  res.status(200).json(data)
}

export default handler
