import { Heading, Stack } from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services'
import { Observation } from '@fc/types/src/observation'

import { ObservationItem } from './ObservationItem'

export type ObservationsProps = {
  id: number
}
export const Observations = ({ id }: ObservationsProps) => {
  const observationRequest = useStrapiRequest<Observation>({
    endpoint: 'observations',
    filters: { profile: { id: { $eq: id } } },
    sort: ['createdAt:desc'],
  })

  const observations = observationRequest.data?.data ?? []

  if (!observations.length) {
    return null
  }

  return (
    <Stack p={{ base: 4, lg: 8 }}>
      <Heading as="h2">Observations</Heading>
      {/* TODO: Add ObservationForm */}
      <Stack>
        {observations?.map(observation => {
          return (
            <ObservationItem
              content={observation?.content}
              createdAt={observation?.createdAt}
              creator={observation?.creator || []}
              key={observation?.id}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}
