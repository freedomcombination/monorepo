import { FC } from 'react'

import { Box, ResponsiveObject, SimpleGrid } from '@chakra-ui/react'

import { Art } from '@fc/types'

import { ArtCard } from '../ArtCard'

type ArtGridProps = {
  arts: Art[]
  refetch: () => void
  recaptchaToken?: string
  columns?: ResponsiveObject<number>
}

export const ArtGrid: FC<ArtGridProps> = ({
  arts,
  refetch,
  recaptchaToken,
  columns,
}) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4, ...columns }} gap={4}>
      {arts?.map(art => {
        return (
          <Box key={art.id} h={300}>
            <ArtCard
              refetch={refetch}
              recaptchaToken={recaptchaToken}
              art={art}
            />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}
