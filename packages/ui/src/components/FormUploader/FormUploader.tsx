import { FC, useState } from 'react'

import {
  Divider,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useDropzone } from 'react-dropzone'
import { BiUpload } from 'react-icons/bi'
import { FaArrowDownWideShort } from 'react-icons/fa6'
import { useLocalStorage } from 'react-use'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { UploadFile } from '@fc/types'

import { MenuFileItem } from './MenuFileItem'

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
      .catch(err => console.log(err))
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
      .catch(err => console.log(err))
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
      .catch(err => console.log(err))
      .finally(() => setIsUploading(false))
  }

  return (
    <HStack spacing={0} borderWidth={1} borderBottomWidth={0} h={12}>
      <DragZone isUploading={isUploading} onFilesSelected={onFilesSelected} />
      <Divider orientation="vertical" />
      <ImageViewer
        files={uploadedFiles}
        oldFiles={!!fileIds && fileIds.length > 0}
        fetchFiles={fetchFiles}
        onDelete={onDelete}
      />
    </HStack>
  )
}

type ImageViewerProps = {
  files: UploadFile[]
  fetchFiles: () => void
  onDelete: (file: UploadFile) => void
  oldFiles: boolean
}

const ImageViewer: FC<ImageViewerProps> = ({
  files,
  fetchFiles,
  onDelete,
  oldFiles,
}) => {
  const { t } = useTranslation()

  return (
    <Menu placement="bottom" autoSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<FaArrowDownWideShort />}
        aria-label="Show Menu"
        variant={'outline'}
        rounded={0}
        size={'sm'}
        boxSize={12}
        border={0}
        colorScheme="gray"
      />
      <Portal>
        <MenuList zIndex={9999} maxH={400} overflowY={'auto'} w={500} p={0}>
          {files.length > 0 ? (
            files.map((file, index) => (
              <MenuFileItem
                renderDivider={index > 0}
                key={file.url}
                file={file}
                onDelete={onDelete}
              />
            ))
          ) : (
            <MenuItem onClick={fetchFiles}>
              {oldFiles ? t('form.uploader.old') : t('form.uploader.new')}
            </MenuItem>
          )}
        </MenuList>
      </Portal>
    </Menu>
  )
}

type DragZoneProps = {
  onFilesSelected: (files: File[]) => void
  isUploading: boolean
}

const DragZone: FC<DragZoneProps> = ({ onFilesSelected, isUploading }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onFilesSelected,
  })
  const { t } = useTranslation()

  return (
    <HStack
      {...getRootProps()}
      cursor={'pointer'}
      _hover={{ bg: 'gray.50' }}
      p={4}
      w={'full'}
      h={'full'}
      justify={'center'}
      textAlign={'center'}
    >
      {isUploading ? (
        <Spinner w={6} h={6} />
      ) : (
        <Icon as={BiUpload} w={6} h={6} />
      )}
      <input {...getInputProps()} />
      <Text fontSize={'sm'}>{t('upload.description')}</Text>
    </HStack>
  )
}
