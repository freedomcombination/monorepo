import { forwardRef } from 'react'

import type { ButtonProps, InputProps } from '@chakra-ui/react'
import {
  Button,
  Clipboard as ChakraClipboard,
  IconButton,
  Input,
} from '@chakra-ui/react'
import { LuCheck, LuClipboard, LuLink } from 'react-icons/lu'

const ClipboardIcon = (props: ChakraClipboard.IndicatorProps) => (
  <ChakraClipboard.Indicator copied={<LuCheck />} {...props}>
    <LuClipboard />
  </ChakraClipboard.Indicator>
)

const ClipboardCopyText = (props: ChakraClipboard.IndicatorProps) => (
  <ChakraClipboard.Indicator copied="Copied" {...props}>
    Copy
  </ChakraClipboard.Indicator>
)

export const ClipboardRoot = ChakraClipboard.Root

export const ClipboardLabel = (props: ChakraClipboard.LabelProps) => (
  <ChakraClipboard.Label
    textStyle="sm"
    fontWeight="medium"
    display="inline-block"
    mb="1"
    {...props}
  />
)

export const ClipboardButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardButton(props, ref) {
    return (
      <ChakraClipboard.Trigger asChild>
        <Button ref={ref} size="sm" variant="surface" {...props}>
          <ClipboardIcon />
          <ClipboardCopyText />
        </Button>
      </ChakraClipboard.Trigger>
    )
  },
)

export const ClipboardLink = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardLink(props, ref) {
    return (
      <ChakraClipboard.Trigger asChild>
        <Button
          unstyled
          variant="plain"
          size="xs"
          display="inline-flex"
          alignItems="center"
          gap="2"
          ref={ref}
          {...props}
        >
          <LuLink />
          <ClipboardCopyText />
        </Button>
      </ChakraClipboard.Trigger>
    )
  },
)

export const ClipboardIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function ClipboardIconButton(props, ref) {
    return (
      <ChakraClipboard.Trigger asChild>
        <IconButton ref={ref} size="sm" variant="subtle" {...props}>
          <ClipboardIcon />
          <ClipboardCopyText srOnly />
        </IconButton>
      </ChakraClipboard.Trigger>
    )
  },
)

export const ClipboardInput = forwardRef<HTMLInputElement, InputProps>(
  function ClipboardInputElement(props, ref) {
    return (
      <ChakraClipboard.Input asChild>
        <Input ref={ref} {...props} />
      </ChakraClipboard.Input>
    )
  },
)