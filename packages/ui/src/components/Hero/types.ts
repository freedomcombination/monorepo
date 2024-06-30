import { UploadFile } from '@fc/types'

export type HeroProps = {
  title?: string
  description?: string
  video?: string
  image?: UploadFile | null | string
  isFullHeight?: boolean
}
