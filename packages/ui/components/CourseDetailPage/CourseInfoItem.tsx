import { FC } from 'react'

import { Box, HStack, Text } from '@chakra-ui/react'

import { CourseInfoItemProps } from './types'
export const CourseInfoItem: FC<CourseInfoItemProps> = ({
  icon,
  label,
  value,
}) => (
  <HStack>
    <Box flexShrink={0}>{icon}</Box>
    <HStack>
      <Text fontWeight={500} w={100}>
        {label}:
      </Text>
      <Text>{value}</Text>
    </HStack>
  </HStack>
)
