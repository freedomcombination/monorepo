import { ButtonProps } from '@chakra-ui/react'

import { ActionWrapperProps } from '../ActionWrapper'

export type ActionButtonProps = Omit<ActionWrapperProps<ButtonProps>, 'ui'>
