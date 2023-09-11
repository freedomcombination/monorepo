import { StrapiEndpoint, StrapiModel } from '@wsvvrijheid/types'

import { mutation } from './mutation'

export const deleteMutation = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
  id: number,
  token: string,
) => mutation<T, any>({ endpoint, method: 'delete', id, token })
