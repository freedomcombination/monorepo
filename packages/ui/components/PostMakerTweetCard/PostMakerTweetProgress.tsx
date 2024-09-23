import { ProgressCircleRoot, ProgressCircleValueText } from '@fc/chakra'

import { usePostContext } from '../PostProvider'

export const PostMakerTweetProgress = () => {
  const { isExceeded, percentage, availableCount } = usePostContext()

  const color = isExceeded
    ? 'red.500'
    : availableCount <= 20
      ? 'orange.500'
      : 'black'

  return (
    <ProgressCircleRoot
      value={percentage}
      fontSize={isExceeded ? '32px' : '24px'}
      color={color}
    >
      {availableCount <= 20 && (
        <ProgressCircleValueText fontSize={'xs'}>
          {availableCount}
        </ProgressCircleValueText>
      )}
    </ProgressCircleRoot>
  )
}
