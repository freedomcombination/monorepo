import { useEffect, useState } from 'react'

import axios from 'axios'

export const useFileFromUrl = (
  url?: string,
  filename = 'image.png',
  mime = 'image/png',
) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string) => {
      const response = await axios.get(`/api/images?url=${url}`, {
        responseType: 'blob',
      })
      const file = new File([response.data], filename, {
        type: mime,
      })
      setImageFile(file)
    }

    if (url) createFileFromUrl(url)
  }, [url, mime, filename])

  return imageFile
}
