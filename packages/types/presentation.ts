import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'

export type Flow = {
  title: string
  duration: string
  presenter: string
}

export type PresentationBase = StrapiEntityBase & {
  content: string | null
  date: string
  address: string
  place: string
  flow: Flow[]
}

export type PresentationRelation = {
  image: UploadFile | null
  images: UploadFile[]
  localizations?: Array<Presentation>
}

export type Presentation = StrapiBase & PresentationBase & PresentationRelation
