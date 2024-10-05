import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import {
  StrapiEndpoint,
  StrapiModel,
  StrapiTranslatableModel,
  StrapiUpdateInput,
} from '@fc/types'

export const updateModel = <
  T extends StrapiModel,
  D extends StrapiUpdateInput & { id: number },
>(
  endpoint: StrapiEndpoint,
  id: number,
  args: D,
  token: string,
) => {
  return Mutation.put<T, StrapiUpdateInput>(endpoint, id, args, token)
}

export const useUpdateModelMutation = <
  T extends StrapiModel,
  D extends StrapiUpdateInput & { id: number },
>(
  endpoint: StrapiEndpoint,
) => {
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['update-model', endpoint],
    mutationFn: ({ id, ...args }: D & { id: number }) =>
      updateModel<T, D>(endpoint, id, args as D, token as string),
    onSuccess: res => {
      toast({
        title: `Model updated`,
        description: `Model ${
          (res as StrapiTranslatableModel)?.title
        } has been updated`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      console.error('Update model error', error)
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
