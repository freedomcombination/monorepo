import { ButtonProps } from '@fc/chakra'

import { ActionWrapperProps } from '../ActionWrapper'

export type ActionButtonProps = Omit<ActionWrapperProps<ButtonProps>, 'ui'>
