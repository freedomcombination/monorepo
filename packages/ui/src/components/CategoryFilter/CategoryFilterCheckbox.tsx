import { Box, HStack, Text, useCheckbox } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

export const CategoryFilterCheckbox = (
  props: Parameters<typeof useCheckbox>,
) => {
  const { state, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

  return (
    <HStack
      as="label"
      color={state.isChecked ? 'primary.500' : 'initial'}
      borderWidth={2}
      borderColor={state.isChecked ? 'primary.500' : 'transparent'}
      _hover={{ bg: 'blackAlpha.50' }}
      rounded="full"
      py={2}
      pr={2}
      fontWeight={600}
      cursor="pointer"
      fontSize="md"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Box
        maxW={state.isChecked ? 'auto' : 0}
        ml={state.isChecked ? 2 : 0}
        transition="all 0.2s"
        as={FaCheck}
      />
      <Text w="max-content" {...getLabelProps()}>
        {props.name}
      </Text>
    </HStack>
  )
}
