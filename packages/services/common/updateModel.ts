import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import type { StrapiEndpoint, StrapiModel, StrapiUpdateInput } from '@fc/types'

import { mutation } from './mutation'

export const updateModel = <
  T extends StrapiModel,
  D extends StrapiUpdateInput & { id: number },
>(
  endpoint: StrapiEndpoint,
  id: number,
  args: D,
  token: string,
) => {
  return mutation<T, D>({
    endpoint,
    method: 'put',
    id,
    body: args,
    token,
  })
}

export const useUpdateModelMutation = <
  T extends StrapiModel,
  D extends StrapiUpdateInput & { id: number },
>(
  endpoint: StrapiEndpoint,
) => {
  const { token } = useAuthContext()
  const { locale } = useRouter()

  return useMutation({
    mutationKey: ['update-model', endpoint],
    mutationFn: ({ id, ...args }: D & { id: number }) =>
      updateModel<T, D>(endpoint, id, args as D, token as string),
    onSuccess: res => {
      const data = res?.data as any
      const title =
        data?.title ||
        data?.name ||
        data?.[`title_${locale}`] ||
        data?.[`name_${locale}`]

      toaster.create({
        title: `Model updated`,
        description: `Model ${title} has been updated`,
        type: 'success',
      })
    },
    onError: (error: any) => {
      console.error('Update model error', error)
      toaster.create({
        title: 'Error',
        description: `Something went wrong`,
        type: 'error',
      })
    },
  })
}
