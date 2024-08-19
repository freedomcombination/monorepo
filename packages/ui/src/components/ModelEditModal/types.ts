import { ReactNode } from 'react'

import { DialogRootProps } from '@chakra-ui/react'

import { StrapiModel } from '@fc/types'

import { ModelEditFormProps } from '../ModelEditForm/types'

export type ModelEditModalProps<T extends StrapiModel> = Omit<
  DialogRootProps,
  'id' | 'children'
> &
  Omit<ModelEditFormProps<T>, 'model'> & {
    title: string
    id: number
    isOpen: boolean
    isFullHeight?: boolean
    onClose: () => void
    maxW?: string
    children?: ReactNode
  }
