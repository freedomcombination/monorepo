import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import { Mutation } from '@fc/lib/mutation'
import type {
  StrapiEndpoint,
  StrapiModel,
  StrapiTranslatableModel,
} from '@fc/types'

import { createLocalizations } from '../createLocalizations'

export const approveModel = async <T extends StrapiModel>(
  id: number,
  endpoint: StrapiEndpoint,
  token?: string,
) => {
  return Mutation.put<T, any>(
    `${endpoint}` as StrapiEndpoint,
    id,
    { approvalStatus: 'approved' },
    token as string,
  )
}

export const useApproveModelMutation = <T extends StrapiTranslatableModel>(
  endpoint: StrapiEndpoint,
  translatedFields?: (keyof T)[],
) => {
  const toast = useToast()
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: [`approve-${endpoint}`],
    mutationFn: ({ id }: { id: number }) =>
      approveModel<T>(id, endpoint, token ?? undefined),
    onSuccess: async model => {
      const hasLocalizations = !!model?.data?.localizations?.[0]

      if (model?.data && translatedFields && !hasLocalizations) {
        const localizations = await createLocalizations({
          model: model.data,
          translatedFields:
            translatedFields as (keyof StrapiTranslatableModel)[],
          endpoint,
          token: token as string,
          hasSlug: endpoint !== 'posts',
        })

        // Fixes translated relation fields
        // TODO: Handle this in backend
        const promises = localizations?.map(localizedModel => {
          if (!localizedModel.data) {
            return
          }

          Mutation.put(
            `${endpoint}/relation` as StrapiEndpoint,
            localizedModel.data.id,
            {},
            token as string,
          )
        })

        if (promises) {
          await Promise.all(promises)
        }
      }

      toast({
        title: `Model ${model?.data?.approvalStatus}`,
        description: `Model has been ${model?.data?.approvalStatus}`,
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
