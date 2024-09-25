import { ReactElement } from 'react'

import type { TopicBase } from '@fc/types'

import { ActionButtonProps } from '../ActionButton'

export type TopicCardProps = {
  topic: TopicBase
  onCreatePost?: (topic: TopicBase) => void
  searchKey?: string
  onDelete?: (url: string) => void
}
export type TopicCardButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
} & ActionButtonProps
