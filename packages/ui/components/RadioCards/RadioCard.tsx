import { FC } from 'react'

import { useRadio, Box, BoxProps } from '@chakra-ui/react'

export const RadioCard: FC<BoxProps> = props => {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        cursor="pointer"
        rounded="md"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bgGradient: `linear(to-b, primary.300, primary.500)`,
          color: 'white',
          borderColor: 'transparent',
        }}
        px={5}
        py={3}
        fontWeight={500}
        {...checkbox}
      >
        {props.children}
      </Box>
    </Box>
  )
}
