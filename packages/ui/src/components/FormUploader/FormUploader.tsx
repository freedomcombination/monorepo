import { useState } from 'react'

import { Separator, HStack } from '@chakra-ui/react'
import { useLocalStorage } from 'react-use'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { UploadFile } from '@fc/types'

import { DragZone } from './DragZone'
import { ImageViewer } from './ImageViewer'

export const FormUploader = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([])
  const [fileIds, setFileIds] = useLocalStorage<number[]>('imageIds', [])
  const { token } = useAuthContext()

  const onFilesSelected = async (files: File[]) => {
    if (files.length === 0) return
    setIsUploading(true)

    const uploadAsync = async (files: File[]) => {
      const formData = new FormData()
      files.forEach(file => {
        formData.append(`files`, file, file.name)
      })

      const result = await fetch(API_URL + '/api/upload', {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const fileData = (await result.json()) as UploadFile[]
      setUploadedFiles(prev => [...prev, ...fileData])

      // add local storage those ids...
      const ids = fileData.map(image => image.id)
      if (!fileIds) {
        setFileIds(ids)
      } else {
        const uniqueIds = new Set([...fileIds, ...ids])
        setFileIds(Array.from(uniqueIds))
      }
    }

    uploadAsync(files)
      .catch(err => console.error(err))
      .finally(() => setIsUploading(false))
  }

  const fetchFiles = () => {
    if (!fileIds || fileIds.length === 0) return

    setIsUploading(true)
    const fetchFilesAsync = async () => {
      const result = await fetch(API_URL + '/api/upload/files', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const fileData = (await result.json()) as UploadFile[]
      const filteredImages = fileData.filter(file => fileIds.includes(file.id))
      setUploadedFiles(filteredImages)
    }

    fetchFilesAsync()
      .catch(err => console.error(err))
      .finally(() => setIsUploading(false))
  }

  const onDelete = (file: UploadFile) => {
    setIsUploading(true)

    const deleteFilesAsync = async () => {
      await fetch(API_URL + '/api/upload/files/' + file.id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUploadedFiles(prev => prev.filter(i => i.id !== file.id))
      setFileIds(prev => prev?.filter(i => i !== file.id))
    }

    deleteFilesAsync()
      .catch(err => console.error(err))
      .finally(() => setIsUploading(false))
  }

  return (
    <HStack gap={0} borderWidth={1} borderBottomWidth={0} h={12}>
      <DragZone isUploading={isUploading} onFilesSelected={onFilesSelected} />
      <Separator orientation="vertical" />
      <ImageViewer
        files={uploadedFiles}
        oldFiles={!!fileIds && fileIds.length > 0}
        fetchFiles={fetchFiles}
        onDelete={onDelete}
      />
    </HStack>
  )
}
