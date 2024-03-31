import { useEffect, useState } from 'react'

import { Box, Skeleton } from '@chakra-ui/react'

export const ArtCardSkeleton = ({ isMasonry }: { isMasonry: boolean }) => {
  const [height, setHeight] = useState('300px')
  useEffect(
    () =>
      setHeight(
        isMasonry
          ? `${Math.floor(Math.random() * (400 - 200 + 1)) + 200}px`
          : `300px`,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <Box w="full" pos="relative">
      <Skeleton h={height} />
    </Box>
  )
}
