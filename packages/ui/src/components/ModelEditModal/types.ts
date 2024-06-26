import { StrapiModel } from '@fc/types'
import { ModelEditFormProps } from '../ModelEditForm/types'
import { ModalProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

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
