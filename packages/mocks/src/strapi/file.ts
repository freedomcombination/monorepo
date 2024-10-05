import { UploadFile } from '@fc/types'

import files from './files.json'

export const getFiles = (index?: number): UploadFile[] =>
  index ? [files[index]] : files
