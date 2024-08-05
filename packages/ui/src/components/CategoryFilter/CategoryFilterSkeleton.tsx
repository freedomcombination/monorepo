import { HStack, Skeleton } from '@chakra-ui/react'

export const CategoryFilterSkeleton = () => {
  return (
    <HStack gap={2}>
      <Skeleton rounded={'full'} flexShrink={0} boxSize="8" />
      <Skeleton rounded="lg" h={4} w={32} />
    </HStack>
  )
}
