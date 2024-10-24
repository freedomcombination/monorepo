import { useMutation } from '@tanstack/react-query'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import type { StrapiEndpoint, StrapiModel } from '@fc/types'

import { mutation } from './mutation'

export const unpublishModel = <T extends StrapiModel>(
  id: number,
  endpoint: StrapiEndpoint,
  token: string,
) => {
  const body = { publishedAt: null }

  return mutation<T, typeof body>({
    endpoint,
    method: 'put',
    id,
    body,
    token,
  })
}

export const useUnpublishModelMutation = <T extends StrapiModel>(
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
