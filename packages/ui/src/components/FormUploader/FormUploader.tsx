import { FC, useEffect, useRef, useState } from 'react'

import {
  Center,
  Text,
  HStack,
  Icon,
  IconButton,
  Spinner,
  VStack,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  MenuItem,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useDropzone } from 'react-dropzone'
import { BiUpload } from 'react-icons/bi'
import { FaArrowDownWideShort, FaCopy } from 'react-icons/fa6'
import { useLocalStorage } from 'react-use'

import { API_URL, ASSETS_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { FileFormat, UploadFile } from '@fc/types'
import { toastMessage } from '@fc/utils'

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

  const boxStyles = {
    p: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'gray.200',
    rounded: 'md',
    h: '44px',
  }

  return (
    <VStack spacing={1} align={'stretch'}>
      <Center {...boxStyles}>
        <DragZone isUploading={isUploading} onFilesSelected={onFilesSelected} />
      </Center>

      <Center {...boxStyles}>
        <ImageViewer
          images={uploadedImages}
          oldImages={!!imageIds && imageIds.length > 0}
          fetchImages={fetchImages}
          onDelete={onDelete}
        />
      </Center>
    </VStack>
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
  const [selected, setSelected] = useState<{
    image: UploadFile
    format: FileFormat
  } | null>(null)

  const getImageUrl = () => {
    if (!selected) return null
    if (process.env.NODE_ENV === 'development')
      return API_URL + selected?.format.url

    return ASSETS_URL + selected?.format.url
  }

  const selectedImageURL = getImageUrl()
  const textRef = useRef<HTMLParagraphElement>(null)
  const { t } = useTranslation()

  const buttonStyles = {
    variant: 'outline',
    size: 'sm',
    fontSize: '0.8em',
    color: 'gray.600',
    rounded: 'full',
    flexGrow: 0,
    flexShrink: 0,
    isDisabled: !selectedImageURL,
  }

  const onCopy = () => {
    if (!selectedImageURL) return
    navigator.clipboard.writeText(`![image](${selectedImageURL})`)
    toastMessage(
      t('form.uploader.success'),
      t('form.uploader.copied'),
      'success',
    )
  }

  useEffect(() => {
    if (!selected) return
    const url = getImageUrl()
    navigator.clipboard.writeText(`![image](${url})`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Flex flexDir={'row'} gap={2} w={'full'}>
      <Menu placement="bottom" autoSelect={false}>
        <MenuButton
          as={IconButton}
          icon={<FaArrowDownWideShort />}
          aria-label="Show Menu"
          {...buttonStyles}
          isDisabled={false}
        />
        <Portal>
          <MenuList zIndex={9999} maxH={400} overflowY={'auto'} w={500}>
            {images.length > 0 ? (
              images.map(image => (
                <MenuImageItem
                  key={image.url}
                  image={image}
                  onSelect={(image, format) => setSelected({ image, format })}
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

      <Text
        ref={textRef}
        flexGrow={1}
        noOfLines={1}
        overflow={'hidden'}
        p={1}
        fontSize={'small'}
        borderWidth={1}
        borderColor={'gray.200'}
        borderRadius={'lg'}
        flexShrink={1}
      >
        {selectedImageURL ?? '...'}
      </Text>

      <IconButton
        aria-label="Copy"
        icon={<FaCopy />}
        {...buttonStyles}
        onClick={onCopy}
      />
    </Flex>
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
    <HStack {...getRootProps()}>
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
