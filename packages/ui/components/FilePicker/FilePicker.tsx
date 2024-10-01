import { FC, useEffect, useId, useMemo, useState } from 'react'

import { Center, Input, VStack } from '@chakra-ui/react'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import ImageEditor from '@uppy/image-editor'
import { Dashboard } from '@uppy/react'

import { FilePickerProps } from './types'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'

const FilePicker: FC<FilePickerProps> = ({
  children,
  maxNumberOfFiles,
  onLoaded,
  allowedFileTypes = ['image/*'],
  autoOpen = 'imageEditor',
  ...props
}) => {
  const [images, setImages] = useState<File[]>([])

  const id = useId()

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    const filesArray = Array.from(files).map(file => file as File)
    filesArray.forEach(file =>
      uppy.addFile({ name: file.name, type: file.type, data: file }),
    )
  }

  return (
    <>
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
              <Input
                type="file"
                id={id}
                display="none"
                {...props}
                accept={allowedFileTypes.join(',')}
                multiple
                onChange={handleChange}
              />
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
    </>
  )
}

export default FilePicker
