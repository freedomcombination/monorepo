import { useMutation } from '@tanstack/react-query'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { StrapiEndpoint, StrapiModel } from '@fc/types'

export const publishModel = <T extends StrapiModel>(
  id: number,
  endpoint: StrapiEndpoint,
  token: string,
) => {
  const body = { publishedAt: new Date() }

  return Mutation.put<T, typeof body>(endpoint, id, body, token)
}

export const usePublishModel = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
) => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`publish-${endpoint}`],
    mutationFn: ({ id }: { id: number }) =>
      publishModel<T>(id, endpoint, token as string),
    onSuccess: () => {
      toaster.create({
        title: `Successfully Published`,
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
