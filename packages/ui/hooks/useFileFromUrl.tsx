import { useEffect, useState } from 'react'

import axios from 'axios'

import { ASSETS_URL } from '@fc/config/constants'

export const useFileFromUrl = (
  url?: string,
  filename = 'image.png',
  mime = 'image/png',
) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string) => {
      const imageUrl = url.startsWith('http') ? url : `${ASSETS_URL}${url}`
      const response = await axios.get(`/api/images?url=${imageUrl}`, {
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
