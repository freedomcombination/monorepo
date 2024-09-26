import type { UploadFile } from '@fc/types'

export type AcademyCardProps = {
  href: string
  image: UploadFile | string | undefined | null
  description?: string
  title: string
}
