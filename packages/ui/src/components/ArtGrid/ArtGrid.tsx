import { FC } from 'react'

import { Box, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

import { Art } from '@fc/types'

import { ArtCard } from '../ArtCard'

type ArtGridProps = {
  arts: Art[]
  refetch: () => void
  recaptchaToken?: string
  columns?: SimpleGridProps['columns']
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
    <SimpleGrid columns={columns || { base: 1, sm: 2, lg: 4 }} gap={4}>
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
