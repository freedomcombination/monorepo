import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

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
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['update-model', endpoint],
    mutationFn: (args: D) =>
      createModel<T, D>(endpoint, args as D, token as string),
    onSuccess: res => {
      toast({
        title: `Model created`,
        description: `Model ${
          (res as StrapiTranslatableModel)?.title
        } has been created`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error('Create model error', error)
      toast({
        title: 'Error',
        description: `Something went wrong`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
