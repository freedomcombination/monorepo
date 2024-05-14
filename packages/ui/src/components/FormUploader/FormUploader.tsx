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

import { MenuImageItem } from './MenuImageItem'

export const FormUploader = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadFile[]>([])
  const [imageIds, setImageIds] = useLocalStorage<number[]>('imageIds', [])
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

      const images = (await result.json()) as UploadFile[]
      setUploadedImages(prev => [...prev, ...images])

      // add local storage those ids...
      const ids = images.map(image => image.id)
      if (!imageIds) {
        setImageIds(ids)
      } else {
        const uniqueIds = new Set([...imageIds, ...ids])
        setImageIds(Array.from(uniqueIds))
      }
    }

    uploadAsync(files)
      .catch(err => console.log(err))
      .finally(() => setIsUploading(false))
  }

  const fetchImages = () => {
    if (!imageIds || imageIds.length === 0) return

    setIsUploading(true)
    const fetchImagesAsync = async () => {
      const result = await fetch(API_URL + '/api/upload/files', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const images = (await result.json()) as UploadFile[]
      const filteredImages = images.filter(image => imageIds.includes(image.id))
      setUploadedImages(filteredImages)
    }

    fetchImagesAsync()
      .catch(err => console.log(err))
      .finally(() => setIsUploading(false))
  }

  const onDelete = (image: UploadFile) => {
    setIsUploading(true)

    const deleteImagesAsync = async () => {
      await fetch(API_URL + '/api/upload/files/' + image.id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUploadedImages(prev => prev.filter(i => i.id !== image.id))
      setImageIds(prev => prev?.filter(i => i !== image.id))
    }

    deleteImagesAsync()
      .catch(err => console.log(err))
      .finally(() => setIsUploading(false))
  }

  return (
    <HStack spacing={0} borderWidth={1} borderBottomWidth={0} h={12}>
      <DragZone isUploading={isUploading} onFilesSelected={onFilesSelected} />
      <Divider orientation="vertical" />
      <ImageViewer
        images={uploadedImages}
        oldImages={!!imageIds && imageIds.length > 0}
        fetchImages={fetchImages}
        onDelete={onDelete}
      />
    </HStack>
  )
}

type ImageViewerProps = {
  images: UploadFile[]
  fetchImages: () => void
  onDelete: (image: UploadFile) => void
  oldImages: boolean
}

const ImageViewer: FC<ImageViewerProps> = ({
  images,
  fetchImages,
  onDelete,
  oldImages,
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
          {images.length > 0 ? (
            images.map(image => (
              <MenuImageItem
                key={image.url}
                image={image}
                onDelete={onDelete}
              />
            ))
          ) : (
            <MenuItem onClick={fetchImages}>
              {oldImages ? t('form.uploader.old') : t('form.uploader.new')}
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
