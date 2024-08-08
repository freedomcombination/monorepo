import { FC } from 'react'

import { FaInfo } from 'react-icons/fa6'

import { useHashtagContext } from '../../components/HashtagProvider'
import { IconButton } from '../IconButton'
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
