import { Dispatch, SetStateAction } from 'react'

import { Collection } from '@fc/types'

export type CollectionEditFormProps = {
  collection: Collection
  isEdit: boolean
  setEdit: Dispatch<SetStateAction<boolean>>
}

export type CollectionEditFormFieldValues = {
  title: string
  description: string
}

export type CollectionEditProps = {
  collection: Collection
  onSuccess: () => void
}

export type CollectionAccordionItemProps = {
  collection: Collection
}
