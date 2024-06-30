import { UploadFile } from '@fc/types'

export type ImageViewerProps = {
  files: UploadFile[]
  fetchFiles: () => void
  onDelete: (file: UploadFile) => void
  oldFiles: boolean
}

export type DragZoneProps = {
  onFilesSelected: (files: File[]) => void
  isUploading: boolean
}
