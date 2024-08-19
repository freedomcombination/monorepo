import { Box, HStack, Text, useCheckbox } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

import {
  CheckboxCardRoot,
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxProps,
} from '@fc/chakra'

export const CategoryFilterCheckbox = (props: CheckboxProps) => {
  const { checked, getControlProps, getLabelProps, getRootProps } =
    useCheckbox(props)

  return (
    <CheckboxCardRoot
      as="label"
      color={checked ? 'primary.500' : 'initial'}
      borderWidth={2}
      borderColor={checked ? 'primary.500' : 'transparent'}
      _hover={{ bg: 'blackAlpha.50' }}
      rounded="full"
      py={2}
      pr={2}
      fontWeight={600}
      cursor="pointer"
      fontSize="md"
      {...getRootProps()}
    >
      <CheckboxCardControl {...getControlProps()} />
      <CheckboxCardLabel {...getLabelProps()}>
        <HStack>
          {checked && <Box as={FaCheck} />}
          <Text w="max-content" {...getLabelProps()}>
            {props.name}
          </Text>
        </HStack>
      </CheckboxCardLabel>
    </CheckboxCardRoot>
  )
}
