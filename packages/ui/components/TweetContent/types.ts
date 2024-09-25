import { FieldValues } from 'react-hook-form'

import type { Tweet } from '@fc/types'

import { ModelMediaProps } from '../ModelMedia'

export type TweetContentProps<T extends FieldValues = FieldValues> = Partial<
  Pick<
    ModelMediaProps<T>,
    'isChangingMedia' | 'toggleChangingMedia' | 'setValue'
  >
> & {
  tweet: Tweet
  horizontal?: boolean
}

export type TweetContentComponent = <T extends FieldValues = FieldValues>(
  props: TweetContentProps<T>,
) => JSX.Element
