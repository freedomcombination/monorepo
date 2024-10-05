import { StrapiBase } from './strapi'

export type FileFormatsType =
  | 'xlarge'
  | 'large'
  | 'small'
  | 'medium'
  | 'thumbnail'
  | 'xsmall'

export interface FileInfoInput {
  name: string
  alternativeText: string
  caption: string
}

export type FileFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
}

export type FileFormats = { [F in FileFormatsType]?: FileFormat }

export type UploadFile = Omit<StrapiBase, 'publishedAt'> & {
  publishedAt?: string | null
  alternativeText: string | null
  caption: string | null
  ext: string
  formats: FileFormats | null
  hash: string
  height: number | null
  mime: string
  name: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  size: number
  url: string
  width: number | null
}
