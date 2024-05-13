import { Heading, Stack } from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services'
import { Observation } from '@fc/types/src/observation'

import { ObservationListItem } from './ObservationListItem'
import { ObservationForm } from '../ObservationForm'

export type ObservationListProps = {
  id: number
}
export const ObservationList = ({ id }: ObservationListProps) => {
  const observationRequest = useStrapiRequest<Observation>({
    endpoint: 'observations',
    filters: { profile: { id: { $eq: id } } },
    sort: ['createdAt:desc'],
  })

  const observations = observationRequest.data?.data ?? []

  return (
    <Stack p={{ base: 4, lg: 8 }}>
      <ObservationForm profileId={id} onSuccess={observationRequest.refetch} />
      {observations.length > 0 && <Heading as="h2">Observations</Heading>}
      <Stack>
        {observations?.map(observation => {
          return (
            <ObservationListItem
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
