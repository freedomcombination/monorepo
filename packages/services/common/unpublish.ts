import { useMutation } from '@tanstack/react-query'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { Mutation } from '@fc/lib/mutation'
import type { StrapiEndpoint, StrapiModel } from '@fc/types'

export const unpublishModel = <T extends StrapiModel>(
  id: number,
  endpoint: StrapiEndpoint,
  token: string,
) => {
  const body = { publishedAt: null }

  return Mutation.put<T, typeof body>(endpoint, id, body, token)
}

export const useUnpublishModel = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
) => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`unpublish-${endpoint}`],
    mutationFn: ({ id }: { id: number }) =>
      unpublishModel<T>(id, endpoint, token as string),
    onSuccess: () => {
      toaster.create({
        title: `Successfully Unpublished`,
        type: 'success',
      })
    },
    onError: () => {
      toaster.create({
        title: 'Error',
        description: 'Something went wrong',
        type: 'error',
      })
    },
  })
}
