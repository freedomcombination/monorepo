import { FC } from 'react'

import { FaInfo } from 'react-icons/fa6'

import { IconButton } from '@fc/chakra'

import { useHashtagContext } from '../HashtagProvider'
import { usePostContext } from '../PostProvider'

export const PostSentenceReference: FC = () => {
  const { sentence } = usePostContext()
  const { setSentence } = useHashtagContext()

  return (
    <IconButton
      aria-label="Manage sentences"
      icon={<FaInfo />}
      variant={'outline'}
      isRound
      onClick={() => setSentence(sentence)}
    />
  )
}
