import { ProgressCircle } from '@chakra-ui/react'

import { usePostContext } from '../PostProvider'

export const PostMakerTweetProgress = () => {
  const { isExceeded, percentage, availableCount } = usePostContext()

  const color = isExceeded
    ? 'red.500'
    : availableCount <= 20
      ? 'orange.500'
      : 'black'

  return (
    <ProgressCircle.Root
      value={percentage}
      size={isExceeded ? '32px' : '24px'}
      thickness={12}
      color={color}
      trackColor={'blackAlpha.200'}
    >
      {availableCount <= 20 && (
        <ProgressCircle.Label fontSize={'xs'}>
          {availableCount}
        </ProgressCircle.Label>
      )}
    </ProgressCircle.Root>
  )
}
