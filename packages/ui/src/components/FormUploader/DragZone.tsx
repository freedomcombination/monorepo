import { FC } from 'react'

import { HStack, Icon, Spinner, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useDropzone } from 'react-dropzone'
import { BiUpload } from 'react-icons/bi'
import { DragZoneProps } from './types'

export const DragZone: FC<DragZoneProps> = ({
  onFilesSelected,
  isUploading,
}) => {
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
