import React, { useEffect } from 'react'

import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'

const Video = () => {
  const { query } = useRouter()
  const [url, setUrl] = React.useState<string | null>(null)

  useEffect(() => {
    if (query.url) {
      try {
        const parsedUrl = new URL(query.url as string)

        setUrl(parsedUrl.href)
      } catch (error) {
        console.error(error)
      }
    }
  }, [query.url])

  if (!url) return null

  return <ReactPlayer url={url} />
}

export default Video
