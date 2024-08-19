import { HStack, Skeleton } from '@chakra-ui/react'

import { SkeletonCircle, SkeletonText } from '@fc/chakra'

interface MentionListSkeletonProps {
  itemCount?: number
}

export const MentionListSkeleton = ({
  itemCount = 6,
}: MentionListSkeletonProps): JSX.Element => {
  return (
    <>
      {new Array(itemCount).fill(null).map((_, i) => (
        <HStack key={i}>
          <HStack flex="1" px={4} py={3}>
            <SkeletonCircle />
            <SkeletonText lineClamp={2} flex="1" />
            <Skeleton h={8} w={12} rounded="2xl" />
          </HStack>
          <Skeleton />
        </HStack>
      ))}
    </>
  )
}
