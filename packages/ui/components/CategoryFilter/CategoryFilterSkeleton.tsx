import { HStack } from '@chakra-ui/react'

import { Skeleton, SkeletonCircle } from '@fc/chakra'

export const CategoryFilterSkeleton = () => {
  return (
    <HStack gap={2}>
      <SkeletonCircle flexShrink={0} size="8" />
      <Skeleton rounded="lg" h={4} w={32} />
    </HStack>
  )
}
