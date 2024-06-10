import { Heading, Stack } from '@chakra-ui/react'

import { Observation } from '@fc/types/src/observation'

import { ObservationCreateForm } from '../ObservationCreateForm'
import { ObservationEditForm } from '../ObservationEditForm'

export type ObservationListProps = {
  onSuccess?: () => void
  observations: Observation[]
  id: number
}
export const ObservationList = ({
  id,
  observations,
  onSuccess,
}: ObservationListProps) => {
  return (
    <Stack p={{ base: 4, lg: 8 }} spacing={4}>
      <Heading as="h2">Observations</Heading>
      <ObservationCreateForm profileId={id} onSuccess={onSuccess} />
      <Stack>
        {observations?.map(observation => {
          return (
            <ObservationEditForm
              id={observation?.id}
              content={observation?.content}
              createdAt={observation?.createdAt}
              creator={observation?.creator || []}
              key={observation?.id}
              onSuccess={onSuccess}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}
