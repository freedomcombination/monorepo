'use client'

import { forwardRef, useMemo } from 'react'

import {
  NativeSelect as ChakraSelect,
  NativeSelectFieldProps,
} from '@chakra-ui/react'

interface NativeSelectRootProps extends ChakraSelect.RootProps {
  icon?: React.ReactNode
}

export const NativeSelectRoot = forwardRef<
  HTMLDivElement,
  NativeSelectRootProps
>(function NativeSelect(props, ref) {
  const { icon, children, ...rest } = props

  return (
    <ChakraSelect.Root ref={ref} {...rest}>
      {children}
      <ChakraSelect.Indicator>{icon}</ChakraSelect.Indicator>
    </ChakraSelect.Root>
  )
})

interface NativeSelectItem {
  value: string
  label: string
  disabled?: boolean
}

interface NativeSelectField extends ChakraSelect.FieldProps {
  items?: Array<string | NativeSelectItem>
}

export const NativeSelectField = forwardRef<
  HTMLSelectElement,
  NativeSelectField
>(function NativeSelectField(props, ref) {
  const { items: itemsProp, children, ...rest } = props

  const items = useMemo(
    () =>
      itemsProp?.map(item =>
        typeof item === 'string' ? { label: item, value: item } : item,
      ),
    [itemsProp],
  )

  return (
    <ChakraSelect.Field ref={ref} {...rest}>
      {children}
      {items?.map(item => (
        <option key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </option>
      ))}
    </ChakraSelect.Field>
  )
})

export const Select = forwardRef<
  HTMLSelectElement,
  Omit<NativeSelectRootProps, 'onChange'> & NativeSelectFieldProps
>(function Select({ placeholder, variant, ...props }, ref) {
  return (
    <NativeSelectRoot variant={variant}>
      <NativeSelectField ref={ref} placeholder={placeholder} {...props} />
    </NativeSelectRoot>
  )
})
