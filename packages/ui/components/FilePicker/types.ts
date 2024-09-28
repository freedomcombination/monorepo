import { ComponentProps } from 'react'

import { Dashboard } from '@uppy/react'

export type FilePickerProps = Omit<ComponentProps<typeof Dashboard>, 'uppy'> & {
  allowedFileTypes?: string[]
  maxNumberOfFiles?: number
  onLoaded?: (files: File[], previews: string[]) => void // TODO i think this is not working the way it should
  onFilesChanged?: (files: File[]) => void // this ll always gives all files in the dashboard
}
