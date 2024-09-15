import { StackProps } from '@chakra-ui/react'

import { ActionWrapperProps } from '../ActionWrapper'

export type ActionStackProps = Omit<ActionWrapperProps<StackProps>, 'ui'>
