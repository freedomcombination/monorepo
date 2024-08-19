import { StackProps, BoxProps } from '@chakra-ui/react'
import { ButtonProps } from '@fc/chakra'

import { StrapiEndpoint } from '@fc/types'

export type ActionWrapperProps<T extends StackProps | BoxProps | ButtonProps> =
  {
    canApprove?: StrapiEndpoint
    canCreate?: StrapiEndpoint
    canDelete?: StrapiEndpoint
    canUpdate?: StrapiEndpoint
    canRead?: StrapiEndpoint
    checkActions?: {
      endpoint: StrapiEndpoint
      actions: string[]
    }
    isVisible?: boolean
    onlyAdmin?: boolean
    ui: React.ElementType
  } & T
