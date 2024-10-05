import slugify from '@sindresorhus/slugify'
import { nanoid } from 'nanoid'

import { StrapiCreateInput, StrapiEndpoint, StrapiUpdateInput } from '@fc/types'

export const generateFormData = <
  T extends StrapiCreateInput | StrapiUpdateInput,
>(
  body: T,
  hasDataField = true,
  endpoint?: StrapiEndpoint,
) => {
  const formData = new FormData()

  const data = {} as Record<string, unknown>

  const initialData = body as any

  const fileName = slugify(
    initialData.title ||
      initialData.title_en ||
      initialData.name ||
      initialData.description?.slice(0, 10) ||
      nanoid(8),
  )

  if (endpoint) {
    // Store the file in the endpoint path folder
    // Only works for AWS S3 or CF R2 maybe
    formData.append('path', endpoint)
  }

  Object.entries(body).forEach(([key, value]) => {
    const file = value as File | Blob
    const files = value as File[] | Blob[]

    if (
      file instanceof File ||
      files?.[0] instanceof File ||
      file instanceof Blob ||
      files?.[0] instanceof Blob
    ) {
      if (Array.isArray(value)) {
        value.forEach(f => {
          formData.append(`files.${key}`, f as File, fileName)
        })
      } else {
        formData.append(`files.${key}`, value as File, fileName)
      }
    } else {
      data[key] = value
    }
  })

  if (hasDataField) {
    formData.append('data', JSON.stringify(data))
  } else {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
  }

  return formData
}
