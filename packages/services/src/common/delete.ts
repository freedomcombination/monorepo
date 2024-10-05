import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { StrapiEndpoint, StrapiModel } from '@fc/types'

export const deleteModel = <T extends StrapiModel>(
  id: number,
  endpoint: StrapiEndpoint,
  token: string,
) => {
  return Mutation.delete<T>(endpoint, id, token)
}

export const useDeleteModel = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
) => {
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`delete-${endpoint}`],
    mutationFn: ({ id }: { id: number }) =>
      deleteModel<T>(id, endpoint, token as string),
    onSuccess: () => {
      // TODO Add translations
      toast({
        title: `Successfully Deleted`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
