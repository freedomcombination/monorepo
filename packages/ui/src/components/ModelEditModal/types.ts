import { ReactNode } from 'react'

import { ModalProps } from '@chakra-ui/react'

import { StrapiModel } from '@fc/types'

import { ModelEditFormProps } from '../ModelEditForm/types'

export type ModelEditModalProps<T extends StrapiModel> = Omit<
  ModalProps,
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
