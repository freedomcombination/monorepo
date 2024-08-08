import { BoxProps } from '@chakra-ui/react'

import { StrapiEndpoint } from '@fc/types'

export type ActionWrapperProps<T extends BoxProps> = {
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
