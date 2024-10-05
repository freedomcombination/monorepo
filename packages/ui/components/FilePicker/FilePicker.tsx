import { FC, useEffect, useId, useMemo, useState } from 'react'

import { Box, Button, Center, Text, VStack } from '@chakra-ui/react'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import ImageEditor from '@uppy/image-editor'
import { Dashboard } from '@uppy/react'
import { FaUpload } from 'react-icons/fa6'

import { FilePickerProps } from './types'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'

const FilePicker: FC<FilePickerProps> = ({
  children,
  height = 250,
  maxNumberOfFiles,
  onLoaded,
  allowedFileTypes = ['image/*'],
  autoOpen = 'imageEditor',
  ...props
}) => {
  const [images, setImages] = useState<File[]>([])

  const id = useId().replace(/:/g, '-')

  const uppy = useMemo(
    () =>
      new Uppy({
        meta: { type: 'avatar' },
        autoProceed: true,
      })
        .use(Compressor, {
          id: 'Compressor',
          quality: 0.9,
          limit: 2,
        })
        .use(ImageEditor),
    // TODO: Investigate why this is needed to prevent uppy from using the same instance
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  )

  useEffect(() => {
    uppy.setOptions({
      restrictions: {
        maxNumberOfFiles,
        allowedFileTypes,
      },
    })
  }, [maxNumberOfFiles, allowedFileTypes, uppy])

  useEffect(() => {
    uppy.getFiles().forEach(file => {
      uppy.removeFile(file.id)
    })
  }, [uppy])

  uppy.on('preprocess-complete', file => {
    if (!file?.data) return

    onLoaded([file.data as File], file.preview ? [file.preview] : [])
  })

  uppy.on('files-added', result => {
    const files = result.map(file => file.data as File)
    setImages([...images, ...files])
  })

  uppy.on('cancel-all', () => {
    onLoaded([], [])
    setImages([])
  })

  uppy.on('file-removed', file => {
    const files = images.filter(
      image => (image as File).name !== (file.data as File).name,
    )
    setImages(files)
    onLoaded(files, [])
  })

  const showDashboard = images.length ? true : false

  const onTrigger = () => {
    // Trigger file input
    const input = document.querySelector(
      `#${id} .uppy-Dashboard-input`,
    ) as HTMLInputElement

    if (images?.length === 0) {
      input?.click()
    }
  }

  return (
    <Button
      colorScheme="blackAlpha"
      variant={'outline'}
      borderStyle={'dashed'}
      color={'gray.700'}
      onClick={onTrigger}
      sx={{
        '.uppy-Root': {
          opacity: showDashboard ? 1 : 0,
          h: 250,
        },
        '.uppy-Container': {
          w: 'full',
        },
        '.uppy-Dashboard-overlay': {
          display: 'none',
        },
        '.uppy-ImageCropper-controls': {
          h: 'auto',
        },
        '.uppy-Dashboard': {
          h: 'full',
        },
        '.uppy-ImageCropper-container': {
          display: 'flex',
          justifyContent: 'center',
        },
        '.uppy-Dashboard-inner': {
          w: 'full !important',
          h: showDashboard ? `100% !important` : '250px !important',
        },
        '.uppy-Dashboard-AddFiles-title,.uppy-Dashboard-progressindicators': {
          display: 'none',
        },
        '.uppy-DashboardTab': {
          h: 'full',
        },
        '.uppy-DashboardTab-btn': {
          pos: 'absolute',
          top: 0,
          left: 0,
          boxSize: 'full',
          justifyContent: 'center',
        },
      }}
      w="full"
      h={showDashboard ? 'auto' : height}
      border={1}
      rounded={'lg'}
      pos={'relative'}
    >
      {!showDashboard &&
        (children || (
          <Center
            borderWidth={2}
            rounded={'lg'}
            borderStyle={'dashed'}
            pos="absolute"
            top={0}
            left={0}
            boxSize={'full'}
          >
            <VStack flex={1} p={4} textAlign={'center'}>
              <Box as={FaUpload} boxSize={12} />
              <Text fontSize={'2xl'} fontWeight={600}>
                Upload
              </Text>
            </VStack>
          </Center>
        ))}

      <Dashboard
        id={id}
        width={'100%'}
        style={{ height: 250 }}
        uppy={uppy}
        hideUploadButton
        showSelectedFiles
        autoOpen={autoOpen}
        {...props}
      />
    </Button>
  )
}

export default FilePicker
