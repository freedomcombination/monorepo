import { ComponentProps, FC, useEffect, useId, useMemo } from 'react'

import { Stack } from '@chakra-ui/react'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import ImageEditor from '@uppy/image-editor'
import { Dashboard } from '@uppy/react'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.min.css'

export type FilePickerProps = Omit<ComponentProps<typeof Dashboard>, 'uppy'> & {
  allowedFileTypes?: string[]
  maxNumberOfFiles?: number
  onLoaded: (files: File[], previews: string[]) => void
}

const getUppy = () =>
  new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
  })
    .use(Compressor, {
      id: 'Compressor',
      quality: 0.9,
      limit: 2,
    })
    .use(ImageEditor)

export const FilePicker: FC<FilePickerProps> = ({
  maxNumberOfFiles,
  onLoaded,
  allowedFileTypes = ['image/*', 'video/*'],
  ...props
}) => {
  const uppy = useMemo(() => getUppy(), [])

  uppy.on('complete', result => {
    const files = result.successful.map(file => file.data)
    const previews = result.successful.map(file => file.preview)

    onLoaded(files as File[], previews as string[])
  })

  useEffect(() => {
    uppy.setOptions({
      restrictions: {
        maxNumberOfFiles,
        allowedFileTypes,
      },
    })
  }, [maxNumberOfFiles, allowedFileTypes, uppy])

  return (
    <Stack>
      <Dashboard
        id={useId()}
        width="100%"
        height={300}
        uppy={uppy}
        hideUploadButton
        showSelectedFiles
        autoOpen={'imageEditor'}
        {...props}
      />
    </Stack>
  )
}
