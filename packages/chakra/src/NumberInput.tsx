import { forwardRef } from 'react'

import { NumberInput as ChakraNumberInput } from '@chakra-ui/react'

export type NumberInputProps = ChakraNumberInput.RootProps

export const NumberInputRoot = forwardRef<HTMLDivElement, NumberInputProps>(
  function NumberInput(props, ref) {
    const { children, ...rest } = props

    return (
      <ChakraNumberInput.Root ref={ref} variant="outline" {...rest}>
        {children}
        <ChakraNumberInput.Control>
          <ChakraNumberInput.IncrementTrigger />
          <ChakraNumberInput.DecrementTrigger />
        </ChakraNumberInput.Control>
      </ChakraNumberInput.Root>
    )
  },
)

export const NumberInputField = ChakraNumberInput.Input
export const NumberInputLabel = ChakraNumberInput.Label
export const NumberInputScruber = ChakraNumberInput.Scrubber

export const NumberInput = NumberInputRoot
export const NumberInputStepper = ChakraNumberInput.Scrubber
export const NumberIncrementStepper = ChakraNumberInput.IncrementTrigger
export const NumberDecrementStepper = ChakraNumberInput.DecrementTrigger
