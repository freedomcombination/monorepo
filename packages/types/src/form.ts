import { StrapiCollectionEndpoint, StrapiModel } from './strapi'

type FormTextFields = {
  type?:
    | 'boolean'
    | 'date'
    | 'datetime-local'
    | 'file'
    | 'markdown'
    | 'number-input'
    | 'text'
    | 'textarea'
    | 'mediaUrl'
}

type FormSelectFields = {
  type: 'select'
  isMulti?: boolean
  endpoint?: StrapiCollectionEndpoint
  populate?: string | string[]
  options?: string[]
}
export type FormCommonFields<T extends StrapiModel> = {
  name: keyof T
  label?: string
  required?: boolean
  group?: { value: string; label?: string; name: string }
  blockEdit?: boolean
}

export type FormFields<T extends StrapiModel> = Array<
  | (FormTextFields & FormCommonFields<T>)
  | (FormSelectFields & FormCommonFields<T>)
>
