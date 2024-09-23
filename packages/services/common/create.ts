import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { Mutation } from '@fc/lib/mutation'
import type { StrapiCreateInput, StrapiEndpoint, StrapiModel } from '@fc/types'

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
  const { locale } = useRouter()

  return useMutation({
    mutationKey: ['update-model', endpoint],
    mutationFn: (args: D) =>
      createModel<T, D>(endpoint, args as D, token as string),
    onSuccess: res => {
      const data = res?.data as any
      const title =
        data?.title ||
        data?.name ||
        data?.[`title_${locale}`] ||
        data?.[`name_${locale}`]
      toaster.create({
        title: `Model created`,
        description: `Model ${title} has been created`,
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
