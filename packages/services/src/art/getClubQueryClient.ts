import { QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'

import { RequestCollectionArgs, strapiRequest } from '@fc/lib'
import { Art, StrapiLocale } from '@fc/types'

export const getClubQueryClient = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  // The props of the argument object should be used in the same order
  // when we pass in useQuery to be able to use the cache properly in the client side
  const requestArgs: RequestCollectionArgs<Art> = {
    endpoint: 'arts',
    locale,
    page: 1,
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
  }

  const queryKey = Object.entries(requestArgs)

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => strapiRequest<Art>(requestArgs),
  })

  return queryClient
}
