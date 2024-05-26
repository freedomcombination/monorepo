import { FC } from 'react'

import { TopicCardButtonProps } from './types'
import { ActionButton } from '../../components'

export const TopicCardButton: FC<TopicCardButtonProps> = ({
  icon,
  onClick,
  title,
  ...rest
}) => {
  return (
    <ActionButton
      aria-label={title}
      onClick={onClick}
      leftIcon={icon}
      {...rest}
    >
      {title}
    </ActionButton>
  )
}
