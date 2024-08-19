import { useMutation } from '@tanstack/react-query'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import {
  StrapiCreateInput,
  StrapiEndpoint,
  StrapiModel,
  StrapiTranslatableModel,
} from '@fc/types'

export const createModel = <T extends StrapiModel, D extends StrapiCreateInput>(
  endpoint: StrapiEndpoint,
  args: D,
  token: string,
) => {
  return Mutation.post<T, D>(endpoint, args, token)
}

export const useCreateModelMutation = <
  T extends StrapiModel,
  D extends StrapiCreateInput,
>(
  endpoint: StrapiEndpoint,
) => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['update-model', endpoint],
    mutationFn: (args: D) =>
      createModel<T, D>(endpoint, args as D, token as string),
    onSuccess: res => {
      toaster.create({
        title: `Model created`,
        description: `Model ${
          (res as StrapiTranslatableModel)?.title
        } has been created`,
        type: 'success',
      })
    },
    onError: (error: any) => {
      console.error('Create model error', error)
      toaster.create({
        title: 'Error',
        description: `Something went wrong`,
        type: 'error',
      })
    },
  })
}
