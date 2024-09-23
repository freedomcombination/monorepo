import { Box, HStack, Text } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

import { CheckboxCard, CheckboxCardProps } from '@fc/chakra'

export const CategoryFilterCheckbox = (props: CheckboxCardProps) => {
  const { checked } = props

  return (
    <CheckboxCard
      as="label"
      data-testid={props.value}
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
      {...props}
    >
      <HStack>
        {checked && <Box as={FaCheck} />}
        <Text w="max-content">{props.name || props.label}</Text>
      </HStack>
    </CheckboxCard>
  )
}
