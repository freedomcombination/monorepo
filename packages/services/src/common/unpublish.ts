import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { StrapiEndpoint, StrapiModel } from '@fc/types'

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
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`unpublish-${endpoint}`],
    mutationFn: ({ id }: { id: number }) =>
      unpublishModel<T>(id, endpoint, token as string),
    onSuccess: () => {
      toast({
        title: `Successfully Unpublished`,
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
