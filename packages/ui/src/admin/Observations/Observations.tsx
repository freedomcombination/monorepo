import { Stack, Text, Box } from '@chakra-ui/react'

import { useStrapiRequest } from '@fc/services'
import { StrapiCollectionEndpoint, StrapiModel } from '@fc/types'
import { Observation } from '@fc/types/src/observation'

import { ObservationItem } from './ObservationItem'
export type ObservationsProps = {
  endpoint: StrapiCollectionEndpoint
  name: string
  id: number
}
export const Observations = ({ endpoint, name, id }: ObservationsProps) => {
  // const { t } = useTranslation()

  const observations =
    (useStrapiRequest<StrapiModel>({
      endpoint,
      pageSize: 100,
      filters: { profile: { id: { $eq: id } } },
      sort: 'createdDate:desc',
    }) as Observation) || []

  const comments = observations?.data?.data ?? []

  return (
    <Stack>
      <Text fontWeight={600}>{name}</Text>
      <Box borderWidth="1px">
        {comments?.map(comment => {
          return (
            <ObservationItem
              content={comment?.content}
              createdDate={comment?.createdDate}
              creator={comment?.creator || []}
              key={comment?.id}
            />
          )
        })}
      </Box>
    </Stack>
  )
}
