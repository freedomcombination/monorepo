import { useMutation } from '@tanstack/react-query'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import type { StrapiEndpoint, StrapiModel } from '@fc/types'

import { mutation } from './mutation'

export const deleteModel = <T extends StrapiModel>(
  id: number,
  endpoint: StrapiEndpoint,
  token: string,
) => {
  return mutation<T>({ endpoint, method: 'delete', id, token })
}

export const useDeleteModelMutation = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
) => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`delete-${endpoint}`],
    mutationFn: ({ id }: { id: number }) =>
      deleteModel<T>(id, endpoint, token as string),
    onSuccess: () => {
      // TODO Add translations
      toaster.create({
        title: `Successfully Deleted`,
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
