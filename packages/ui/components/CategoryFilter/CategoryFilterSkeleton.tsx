import { HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react'

export const CategoryFilterSkeleton = () => {
  return (
    <HStack spacing={2}>
      <SkeletonCircle flexShrink={0} size="8" />
      <Skeleton rounded="lg" h={4} w={32} />
    </HStack>
  )
}
