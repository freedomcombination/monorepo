import { ComponentProps } from 'react'

import { Dashboard } from '@uppy/react'

export type FilePickerProps = Omit<ComponentProps<typeof Dashboard>, 'uppy'> & {
  allowedFileTypes?: string[]
  maxNumberOfFiles?: number
  onLoaded: (files: File[], previews: string[]) => void
}
