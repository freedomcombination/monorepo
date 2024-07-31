import { FC, ReactNode } from 'react'

import { Tooltip as ChakraTooltip, TooltipRootProps } from '@chakra-ui/react'

export type TooltipProps = {
  label: ReactNode
  children: ReactNode
  hasArrow?: boolean
} & TooltipRootProps

export const Tooltip: FC<TooltipProps> = ({
  label,
  children,
  hasArrow,
  ...props
}) => {
  return (
    <ChakraTooltip.Root {...props}>
      <ChakraTooltip.Trigger>{label}</ChakraTooltip.Trigger>
      <ChakraTooltip.Positioner>
        <ChakraTooltip.Content>
          {hasArrow && <ChakraTooltip.Arrow />}
          {children}
        </ChakraTooltip.Content>
      </ChakraTooltip.Positioner>
    </ChakraTooltip.Root>
  )
}
