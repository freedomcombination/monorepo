import { ReactElement } from 'react'

import { TopicBase } from '@fc/types'

import { ActionButtonProps } from '../../components'

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
