import { Dashboard } from '@uppy/react'
import { ComponentProps } from 'react'

export type FilePickerProps = Omit<ComponentProps<typeof Dashboard>, 'uppy'> & {
  allowedFileTypes?: string[]
  maxNumberOfFiles?: number
  onLoaded: (files: File[], previews: string[]) => void
}
