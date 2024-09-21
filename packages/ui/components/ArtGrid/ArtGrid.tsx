import { FC } from 'react'

import { Box, ResponsiveObject, SimpleGrid } from '@chakra-ui/react'

import type { Art } from '@fc/types'

import { ArtCard } from '../ArtCard'

type ArtGridProps = {
  arts: Art[]
  refetch: () => void
  recaptchaToken?: string
  columns?: ResponsiveObject<number>
  isModal?: boolean
}

export const ArtGrid: FC<ArtGridProps> = ({
  arts,
  refetch,
  recaptchaToken,
  columns,
  isModal,
}) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4, ...columns }} gap={4}>
      {arts?.map(art => {
        return (
          <Box key={art.id}>
            <ArtCard
              refetch={refetch}
              recaptchaToken={recaptchaToken}
              art={art}
              imageHeight={300}
              isModal={isModal}
            />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}
