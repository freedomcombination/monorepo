import { BoxProps } from '@chakra-ui/react'

export type ContentEditableProps = BoxProps & {
  value: string
  onUpdate: (value: string) => void
  threshold?: number
  thresholdStyles?: BoxProps
  autoUpdate?: boolean
}
