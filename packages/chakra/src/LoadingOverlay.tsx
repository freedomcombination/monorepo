import { forwardRef } from 'react'

import { AbsoluteCenter, Box, type BoxProps, Spinner } from '@chakra-ui/react'

type LoadingOverlayProps = BoxProps

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  function LoadingOverlay(props, ref) {
    const { children, ...rest } = props

    return (
      <AbsoluteCenter ref={ref}>
        <Box inset="0" pos="absolute" {...rest} />
        <Spinner size="lg" />
        {children}
      </AbsoluteCenter>
    )
  },
)
