import { forwardRef } from 'react'

import { Box, Field as ChakraField } from '@chakra-ui/react'
import { TbInfoCircle } from 'react-icons/tb'

import { Tooltip } from './Tooltip'

export interface FieldProps extends Omit<ChakraField.RootProps, 'label'> {
  name?: string
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  asterisk?: boolean
  tooltip?: React.ReactNode
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const {
      name,
      label,
      children,
      helperText,
      errorText,
      tooltip,
      required,
      ...rest
    } = props

    return (
      <ChakraField.Root ref={ref} required={required} {...rest}>
        {label && (
          <ChakraField.Label>
            {label} {required && <ChakraField.RequiredIndicator />}
            {tooltip && (
              <Tooltip
                positioning={{ placement: 'top-start' }}
                content={tooltip}
              >
                <Box color="gray.500">
                  <TbInfoCircle />
                </Box>
              </Tooltip>
            )}
          </ChakraField.Label>
        )}
        {children}
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText
            _firstLetter={{ textTransform: 'uppercase' }}
            data-testid={`error-text-${name}`}
          >
            {errorText}
          </ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    )
  },
)