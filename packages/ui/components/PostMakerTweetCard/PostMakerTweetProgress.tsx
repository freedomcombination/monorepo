import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { usePostContext } from '../PostProvider'

export const PostMakerTweetProgress = () => {
  const { isExceeded, percentage, availableCount } = usePostContext()

  const color = isExceeded
    ? 'red.500'
    : availableCount <= 20
      ? 'orange.500'
      : 'black'

  return (
    <CircularProgress
      value={percentage}
      size={isExceeded ? '32px' : '24px'}
      thickness={12}
      color={color}
      trackColor={'blackAlpha.200'}
    >
      {availableCount <= 20 && (
        <CircularProgressLabel fontSize={'xs'}>
          {availableCount}
        </CircularProgressLabel>
      )}
    </CircularProgress>
  )
}
