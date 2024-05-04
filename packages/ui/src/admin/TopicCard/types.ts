import { Dispatch, ReactElement, SetStateAction } from 'react'

import { ButtonProps } from '@chakra-ui/react'

import { TopicBase } from '@fc/types'

export type TopicCardProps = {
  topic: TopicBase
  onCreatePost?: (topic: TopicBase) => void
  setHiddenUrls?: Dispatch<SetStateAction<string[] | undefined>>
}
export type ActionButtonProps = {
  onClick: () => void
  title: string
  icon: ReactElement
} & ButtonProps
